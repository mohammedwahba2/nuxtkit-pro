import prompts from 'prompts'
import {
  AVAILABLE_FEATURES,
  AVAILABLE_PACKAGE_MANAGERS,
  AVAILABLE_TEMPLATES,
  type FeatureName,
  type PackageManagerName,
  type TemplateName
} from './constants.js'
import { CliError } from './errors.js'
import type { Logger } from './logger.js'

export interface CliOptions {
  projectName: string
  template: TemplateName
  features: FeatureName[]
  packageManager: PackageManagerName
  install: boolean
  git: boolean
}

interface ParsedArgs {
  projectName?: string
  template?: string
  features: Set<FeatureName>
  packageManager?: string
  install: boolean
  git: boolean
  yes: boolean
}

export async function resolveOptions(
  argv: string[],
  log: Logger
): Promise<CliOptions> {
  const parsed = parseArgs(argv)

  if (parsed.template && !AVAILABLE_TEMPLATES.includes(parsed.template as TemplateName)) {
    log.warn(`Unknown template "${parsed.template}". Falling back to default.`)
    parsed.template = 'default'
  }

  if (parsed.packageManager && !AVAILABLE_PACKAGE_MANAGERS.includes(parsed.packageManager as PackageManagerName)) {
    throw new CliError(`Unsupported package manager: ${parsed.packageManager}`)
  }

  if (parsed.yes && !parsed.projectName) {
    throw new CliError('Project name is required when using --yes')
  }

  if (parsed.yes) {
    return normalizeOptions({
      projectName: parsed.projectName,
      template: parsed.template as TemplateName | undefined,
      features: [...parsed.features],
      packageManager: parsed.packageManager as PackageManagerName | undefined,
      install: parsed.install,
      git: parsed.git
    })
  }

  const shouldPrompt =
    !parsed.projectName ||
    !parsed.template ||
    !parsed.packageManager

  if (!shouldPrompt) {
    return normalizeOptions({
      projectName: parsed.projectName,
      template: parsed.template as TemplateName | undefined,
      features: [...parsed.features],
      packageManager: parsed.packageManager as PackageManagerName | undefined,
      install: parsed.install,
      git: parsed.git
    })
  }

  const response = await prompts(
    [
      {
        type: !parsed.projectName ? 'text' : null,
        name: 'projectName',
        message: 'Project name',
        initial: 'nuxt-app'
      },
      {
        type: !parsed.template ? 'select' : null,
        name: 'template',
        message: 'Template',
        choices: AVAILABLE_TEMPLATES.map((template) => ({
          title: capitalize(template),
          value: template
        })),
        initial: 0
      },
      {
        type: parsed.features.size === 0 ? 'multiselect' : null,
        name: 'features',
        message: 'Feature packs',
        choices: AVAILABLE_FEATURES.map((feature) => ({
          title: capitalize(feature),
          value: feature,
          selected: parsed.features.has(feature)
        })),
        instructions: false
      },
      {
        type: !parsed.packageManager ? 'select' : null,
        name: 'packageManager',
        message: 'Package manager',
        choices: AVAILABLE_PACKAGE_MANAGERS.map((manager) => ({
          title: manager,
          value: manager
        })),
        initial: 0
      }
    ],
    {
      onCancel() {
        throw new CliError('Scaffolding cancelled', 'PROMPT_CANCELLED')
      }
    }
  )

  return normalizeOptions({
    projectName: parsed.projectName ?? response.projectName,
    template: parsed.template ?? response.template,
    features: parsed.features.size === 0 ? response.features : [...parsed.features],
    packageManager: parsed.packageManager ?? response.packageManager,
    install: parsed.install,
    git: parsed.git
  })
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    features: new Set<FeatureName>(),
    install: true,
    git: true,
    yes: false
  }

  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      parsed.projectName ??= arg
      continue
    }

    if (arg === '--yes') {
      parsed.yes = true
      continue
    }

    if (arg === '--no-install') {
      parsed.install = false
      continue
    }

    if (arg === '--no-git') {
      parsed.git = false
      continue
    }

    if (arg.startsWith('--template=')) {
      parsed.template = arg.split('=')[1]
      continue
    }

    if (arg.startsWith('--package-manager=')) {
      parsed.packageManager = arg.split('=')[1]
      continue
    }

    const featureName = arg.replace(/^--/, '') as FeatureName

    if (AVAILABLE_FEATURES.includes(featureName)) {
      parsed.features.add(featureName)
      continue
    }

    throw new CliError(`Unknown flag: ${arg}`)
  }

  return parsed
}

function normalizeOptions(
  input: Partial<CliOptions> & Pick<CliOptions, 'install' | 'git'>
): CliOptions {
  if (!input.projectName) {
    throw new CliError('Project name is required')
  }

  const projectName = input.projectName.trim()

  if (!isValidProjectName(projectName)) {
    throw new CliError(
      'Invalid project name. Use letters, numbers, dashes, or underscores.'
    )
  }

  return {
    projectName,
    template: (input.template ?? 'default') as TemplateName,
    features: [...new Set((input.features ?? []) as FeatureName[])],
    packageManager: (input.packageManager ?? 'npm') as PackageManagerName,
    install: input.install,
    git: input.git
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function isValidProjectName(value: string): boolean {
  if (!value || value === '.' || value === '..') {
    return false
  }

  if (value.includes('/') || value.includes('\\')) {
    return false
  }

  return /^[a-zA-Z0-9][a-zA-Z0-9-_]*$/.test(value)
}
