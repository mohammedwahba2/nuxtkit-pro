import prompts from 'prompts'
import {
  AVAILABLE_FEATURES,
  AVAILABLE_PACKAGE_MANAGERS,
  AVAILABLE_TEMPLATES,
  CLI_NAME,
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

export type CliCommand =
  | {
      type: 'help'
      helpText: string
    }
  | {
      type: 'create'
      options: CliOptions
    }

interface ParsedArgs {
  projectName?: string
  template?: string
  features: Set<FeatureName>
  packageManager?: string
  install?: boolean
  git?: boolean
  yes: boolean
  help: boolean
}

interface PromptAnswers {
  projectName?: string
  template?: TemplateName
  features?: FeatureName[]
  packageManager?: PackageManagerName
  install?: boolean
  git?: boolean
}

export async function resolveCommand(
  argv: string[],
  log: Logger
): Promise<CliCommand> {
  const parsed = parseArgs(argv)

  if (parsed.help) {
    return {
      type: 'help',
      helpText: createHelpText()
    }
  }

  if (
    parsed.template &&
    !AVAILABLE_TEMPLATES.includes(parsed.template as TemplateName)
  ) {
    log.warn(`Unknown template "${parsed.template}". Falling back to default.`)
    parsed.template = 'default'
  }

  if (
    parsed.packageManager &&
    !AVAILABLE_PACKAGE_MANAGERS.includes(
      parsed.packageManager as PackageManagerName
    )
  ) {
    throw new CliError(
      `Unsupported package manager "${parsed.packageManager}". Use npm, pnpm, or yarn.`,
      'INVALID_PACKAGE_MANAGER'
    )
  }

  if (parsed.yes) {
    return {
      type: 'create',
      options: normalizeOptions({
        projectName: parsed.projectName,
        template: parsed.template as TemplateName | undefined,
        features: [...parsed.features],
        packageManager: parsed.packageManager as PackageManagerName | undefined,
        install: parsed.install,
        git: parsed.git
      })
    }
  }

  const promptAnswers = await promptForMissingValues(parsed)

  return {
    type: 'create',
    options: normalizeOptions({
      projectName: parsed.projectName ?? promptAnswers.projectName,
      template: (parsed.template as TemplateName | undefined) ?? promptAnswers.template,
      features:
        parsed.features.size > 0
          ? [...parsed.features]
          : (promptAnswers.features ?? []),
      packageManager:
        (parsed.packageManager as PackageManagerName | undefined) ??
        promptAnswers.packageManager,
      install: parsed.install ?? promptAnswers.install,
      git: parsed.git ?? promptAnswers.git
    })
  }
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    features: new Set<FeatureName>(),
    yes: false,
    help: false
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (!arg.startsWith('-')) {
      parsed.projectName ??= arg
      continue
    }

    if (arg === '--help' || arg === '-h') {
      parsed.help = true
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

    if (arg === '--install') {
      parsed.install = true
      continue
    }

    if (arg === '--git') {
      parsed.git = true
      continue
    }

    if (arg.startsWith('--template=')) {
      parsed.template = readFlagValue(arg, '--template')
      continue
    }

    if (arg === '--template') {
      parsed.template = readNextArgValue(argv, index, '--template')
      index += 1
      continue
    }

    if (arg.startsWith('--package-manager=')) {
      parsed.packageManager = readFlagValue(arg, '--package-manager')
      continue
    }

    if (arg === '--package-manager') {
      parsed.packageManager = readNextArgValue(argv, index, '--package-manager')
      index += 1
      continue
    }

    const featureName = arg.replace(/^--/, '') as FeatureName

    if (AVAILABLE_FEATURES.includes(featureName)) {
      parsed.features.add(featureName)
      continue
    }

    throw new CliError(`Unknown flag: ${arg}`, 'UNKNOWN_FLAG')
  }

  return parsed
}

async function promptForMissingValues(parsed: ParsedArgs): Promise<PromptAnswers> {
  const shouldPromptForFeatures = parsed.features.size === 0

  return (await prompts(
    [
      {
        type: !parsed.projectName ? 'text' : null,
        name: 'projectName',
        message: 'Project name',
        initial: 'nuxt-app',
        validate: (value: string) =>
          isValidProjectName(value.trim())
            ? true
            : 'Use letters, numbers, dashes, or underscores.'
      },
      {
        type: !parsed.template ? 'select' : null,
        name: 'template',
        message: 'Choose a template',
        choices: AVAILABLE_TEMPLATES.map((template) => ({
          title: capitalize(template),
          value: template
        })),
        initial: 0
      },
      {
        type: shouldPromptForFeatures ? 'multiselect' : null,
        name: 'features',
        message: 'Select optional features',
        choices: AVAILABLE_FEATURES.map((feature) => ({
          title: capitalize(feature),
          value: feature
        })),
        instructions: false,
        hint: 'Space to select, enter to confirm'
      },
      {
        type: !parsed.packageManager ? 'select' : null,
        name: 'packageManager',
        message: 'Choose a package manager',
        choices: AVAILABLE_PACKAGE_MANAGERS.map((manager) => ({
          title: manager,
          value: manager
        })),
        initial: 0
      },
      {
        type: parsed.install === undefined ? 'confirm' : null,
        name: 'install',
        message: 'Install dependencies after scaffolding?',
        initial: true
      },
      {
        type: parsed.git === undefined ? 'confirm' : null,
        name: 'git',
        message: 'Initialize a git repository?',
        initial: true
      }
    ],
    {
      onCancel() {
        throw new CliError('Scaffolding cancelled.', 'PROMPT_CANCELLED')
      }
    }
  )) as PromptAnswers
}

function normalizeOptions(
  input: Partial<CliOptions> & {
    install?: boolean
    git?: boolean
  }
): CliOptions {
  if (!input.projectName) {
    throw new CliError(
      'Project name is required. Run with --help to see available usage.',
      'MISSING_PROJECT_NAME'
    )
  }

  const projectName = input.projectName.trim()

  if (!isValidProjectName(projectName)) {
    throw new CliError(
      'Invalid project name. Use letters, numbers, dashes, or underscores.',
      'INVALID_PROJECT_NAME'
    )
  }

  return {
    projectName,
    template: (input.template ?? 'default') as TemplateName,
    features: [...new Set((input.features ?? []) as FeatureName[])],
    packageManager: (input.packageManager ?? 'npm') as PackageManagerName,
    install: input.install ?? true,
    git: input.git ?? true
  }
}

function readFlagValue(arg: string, flagName: string): string {
  const [, value = ''] = arg.split('=', 2)

  if (!value) {
    throw new CliError(`Missing value for ${flagName}`, 'MISSING_FLAG_VALUE')
  }

  return value
}

function readNextArgValue(argv: string[], index: number, flagName: string): string {
  const nextValue = argv[index + 1]

  if (!nextValue || nextValue.startsWith('-')) {
    throw new CliError(`Missing value for ${flagName}`, 'MISSING_FLAG_VALUE')
  }

  return nextValue
}

function createHelpText(): string {
  const lines = [
    `Usage: ${CLI_NAME} <project-name> [options]`,
    '',
    'Create a Nuxt 4 project from a polished starter template.',
    '',
    'Options:',
    '  --template <name>          Template to use: default, dashboard, landing, saas',
    '  --auth                     Include authentication starter files',
    '  --api                      Include API routes and client utilities',
    '  --tailwind                 Include Tailwind CSS setup',
    '  --lint                     Include ESLint, Prettier, Husky, and lint-staged',
    '  --package-manager <name>   Package manager: npm, pnpm, yarn',
    '  --yes                      Skip prompts and use defaults for missing values',
    '  --no-install               Skip dependency installation',
    '  --no-git                   Skip git initialization',
    '  -h, --help                 Show this help message',
    '',
    'Examples:',
    `  ${CLI_NAME} my-app`,
    `  ${CLI_NAME} admin-panel --template dashboard --auth --api`,
    `  ${CLI_NAME} marketing-site --template=landing --tailwind --no-install`,
    `  ${CLI_NAME} saas-starter --template saas --auth --api --tailwind --lint --package-manager pnpm --yes`
  ]

  return lines.join('\n')
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
