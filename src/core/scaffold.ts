import path from 'node:path'
import fs from 'fs-extra'
import {
  BASE_TEMPLATE_DIR,
  TEMPLATE_VARIANTS_DIR,
  type FeatureName,
  type TemplateName
} from './constants.js'
import { ensureTargetDirectory, mergeFeature } from './files.js'
import type { Logger } from './logger.js'
import { installDeps, setupGit } from './process.js'
import type { CliOptions } from './args.js'
import { applyFeature } from '../features/index.js'
import { CliError } from './errors.js'

interface ScaffoldResult {
  template: TemplateName
  appliedFeatures: FeatureName[]
  skippedFeatures: FeatureName[]
  installSucceeded: boolean
  gitSucceeded: boolean
}

export async function scaffoldProject(
  options: CliOptions,
  cwd: string,
  log: Logger
): Promise<void> {
  const projectDir = path.resolve(cwd, options.projectName)
  const template = await resolveTemplate(options.template, log)
  const result: ScaffoldResult = {
    template,
    appliedFeatures: [],
    skippedFeatures: [],
    installSucceeded: false,
    gitSucceeded: false
  }

  await createProjectFiles(projectDir, options, template, log)
  await applySelectedFeatures(projectDir, options.features, log, result)
  result.gitSucceeded = await maybeSetupGit(projectDir, options, log)
  result.installSucceeded = await maybeInstallDependencies(projectDir, options, log)
  printSummary(options, result, log)
}

async function createProjectFiles(
  projectDir: string,
  options: CliOptions,
  template: TemplateName,
  log: Logger
): Promise<void> {
  const spinner = log.spinner(`Creating project ${options.projectName}`)

  try {
    await ensureTargetDirectory(projectDir)
    await mergeFeature(BASE_TEMPLATE_DIR, projectDir)
    await mergeFeature(path.join(TEMPLATE_VARIANTS_DIR, template), projectDir)
    await personalizePackage(projectDir, options.projectName, options.packageManager)
    spinner.succeed(`Created ${options.projectName} with the ${template} template`)
  } catch (error) {
    spinner.fail(`Failed to create ${options.projectName}`)
    throw error
  }
}

async function applySelectedFeatures(
  projectDir: string,
  features: FeatureName[],
  log: Logger,
  result: ScaffoldResult
): Promise<void> {
  for (const feature of features) {
    try {
      const applied = await applyFeature(feature, projectDir, log)

      if (applied) {
        result.appliedFeatures.push(feature)
      } else {
        result.skippedFeatures.push(feature)
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : `Unable to apply feature "${feature}".`

      log.warn(message)
      result.skippedFeatures.push(feature)
    }
  }
}

async function maybeSetupGit(
  projectDir: string,
  options: CliOptions,
  log: Logger
): Promise<boolean> {
  if (!options.git) {
    log.note('Skipped git initialization.')
    return false
  }

  try {
    await setupGit(projectDir, log)
    return true
  } catch (error) {
    log.warn(error instanceof Error ? error.message : 'Git initialization failed.')
    return false
  }
}

async function maybeInstallDependencies(
  projectDir: string,
  options: CliOptions,
  log: Logger
): Promise<boolean> {
  if (!options.install) {
    log.note('Skipped dependency installation.')
    return false
  }

  try {
    await installDeps(projectDir, options.packageManager, log)
    return true
  } catch (error) {
    log.warn(
      error instanceof Error
        ? error.message
        : 'Dependency installation failed.'
    )
    return false
  }
}

function printSummary(options: CliOptions, result: ScaffoldResult, log: Logger): void {
  log.divider()
  log.success('Project is ready.')
  log.info(`Template: ${result.template}`)
  log.info(
    `Features: ${
      result.appliedFeatures.length > 0 ? result.appliedFeatures.join(', ') : 'none'
    }`
  )

  if (result.skippedFeatures.length > 0) {
    log.warn(`Skipped features: ${result.skippedFeatures.join(', ')}`)
  }

  log.note('')
  log.step('Next steps')
  log.note(`cd ${options.projectName}`)

  if (!result.installSucceeded) {
    log.note(installCommand(options.packageManager))
  }

  log.note(runDevCommand(options.packageManager))
  log.note('')
  log.step('Useful commands')
  log.note(runBuildCommand(options.packageManager))
  log.note(runPreviewCommand(options.packageManager))
  log.note('')
  log.step('More examples')
  log.note(
    `nuxtkit-pro ${options.projectName}-copy --template=${result.template} --no-install --no-git --yes`
  )
  log.note(
    `nuxtkit-pro ${options.projectName}-full --template=${result.template} --auth --api --tailwind --lint --package-manager=${options.packageManager} --yes`
  )
  log.note('')
}

function runDevCommand(packageManager: CliOptions['packageManager']): string {
  if (packageManager === 'npm') {
    return 'npm run dev'
  }

  return `${packageManager} dev`
}

function runBuildCommand(packageManager: CliOptions['packageManager']): string {
  if (packageManager === 'npm') {
    return 'npm run build'
  }

  return `${packageManager} build`
}

function runPreviewCommand(packageManager: CliOptions['packageManager']): string {
  if (packageManager === 'npm') {
    return 'npm run preview'
  }

  return `${packageManager} preview`
}

function installCommand(packageManager: CliOptions['packageManager']): string {
  if (packageManager === 'npm') {
    return 'npm install'
  }

  return `${packageManager} install`
}

async function personalizePackage(
  projectDir: string,
  projectName: string,
  packageManager: CliOptions['packageManager']
): Promise<void> {
  const packageJsonPath = path.join(projectDir, 'package.json')

  try {
    const packageJson = await fs.readJson(packageJsonPath)

    packageJson.name = toPackageName(projectName)
    packageJson.packageManager = packageManager

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
  } catch (error) {
    throw new CliError(
      error instanceof Error
        ? `Unable to personalize package.json. ${error.message}`
        : 'Unable to personalize package.json.',
      'PACKAGE_JSON_UPDATE_FAILED'
    )
  }
}

function toPackageName(projectName: string): string {
  const sanitized = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return sanitized || 'nuxt-app'
}

async function resolveTemplate(
  template: TemplateName,
  log: Logger
): Promise<TemplateName> {
  const preferredTemplateDir = path.join(TEMPLATE_VARIANTS_DIR, template)

  if (await fs.pathExists(preferredTemplateDir)) {
    return template
  }

  const fallbackTemplateDir = path.join(TEMPLATE_VARIANTS_DIR, 'default')

  if (await fs.pathExists(fallbackTemplateDir)) {
    log.warn(`Template "${template}" is unavailable. Falling back to default.`)
    return 'default'
  }

  throw new CliError('No templates are available in this installation.', 'NO_TEMPLATES')
}
