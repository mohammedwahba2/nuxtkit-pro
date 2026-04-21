import path from 'node:path'
import fs from 'fs-extra'
import {
  BASE_TEMPLATE_DIR,
  TEMPLATE_VARIANTS_DIR,
  type FeatureName,
  type TemplateName
} from './constants.js'
import { ensureEmptyTarget, mergeFeature } from './files.js'
import type { Logger } from './logger.js'
import { installDeps, setupGit } from './process.js'
import type { CliOptions } from './args.js'
import { applyAuthFeature } from '../features/auth.js'
import { applyApiFeature } from '../features/api.js'
import { applyTailwindFeature } from '../features/tailwind.js'
import { applyLintFeature } from '../features/lint.js'
import { CliError } from './errors.js'

export async function scaffoldProject(
  options: CliOptions,
  cwd: string,
  log: Logger
): Promise<void> {
  const projectDir = path.resolve(cwd, options.projectName)
  const template = await resolveTemplate(options.template, log)
  const templateDir = path.join(TEMPLATE_VARIANTS_DIR, template)
  const spinner = log.spinner(`Scaffolding ${options.projectName}`)
  let installSucceeded = false

  try {
    await ensureEmptyTarget(projectDir)
    await mergeFeature(BASE_TEMPLATE_DIR, projectDir)
    await mergeFeature(templateDir, projectDir)
    await personalizePackage(projectDir, options.projectName, options.packageManager)
    spinner.succeed(`Created ${options.projectName} using the ${template} template`)
  } catch (error) {
    spinner.fail(`Failed to scaffold ${options.projectName}`)
    throw error
  }

  for (const feature of options.features) {
    await applyFeature(feature, projectDir, log)
  }

  if (options.git) {
    try {
      await setupGit(projectDir, log)
    } catch (error) {
      log.warn(error instanceof Error ? error.message : 'Git initialization failed')
    }
  }

  if (options.install) {
    try {
      await installDeps(projectDir, options.packageManager, log)
      installSucceeded = true
    } catch (error) {
      log.warn(error instanceof Error ? error.message : 'Dependency installation failed')
    }
  }

  printSummary(
    {
      ...options,
      template
    },
    installSucceeded,
    log
  )
}

async function applyFeature(
  feature: FeatureName,
  projectDir: string,
  log: Logger
): Promise<void> {
  switch (feature) {
    case 'auth':
      await applyAuthFeature(projectDir, log)
      return
    case 'api':
      await applyApiFeature(projectDir, log)
      return
    case 'tailwind':
      await applyTailwindFeature(projectDir, log)
      return
    case 'lint':
      await applyLintFeature(projectDir, log)
      return
  }
}

function printSummary(
  options: CliOptions,
  installSucceeded: boolean,
  log: Logger
): void {
  log.success('Project ready')
  log.note('')
  log.info('Template:')
  log.note(`  ${options.template}`)
  log.note('')
  log.info('Features:')
  log.note(`  ${options.features.length > 0 ? options.features.join(', ') : 'none'}`)
  log.note('')
  log.info('Next steps:')
  log.note(`  cd ${options.projectName}`)
  if (!installSucceeded) {
    log.note(`  ${installCommand(options.packageManager)}`)
  }
  log.note(`  ${runDevCommand(options.packageManager)}`)
  log.note('')
}

function runDevCommand(packageManager: CliOptions['packageManager']): string {
  if (packageManager === 'npm') {
    return 'npm run dev'
  }

  return `${packageManager} dev`
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
  const packageJson = await fs.readJson(packageJsonPath)

  packageJson.name = toPackageName(projectName)
  packageJson.packageManager = packageManager

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
}

function toPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
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

  throw new CliError('No templates are available in this installation.')
}
