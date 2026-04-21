import { spawnSync } from 'node:child_process'
import type { Logger } from './logger.js'
import { CliError } from './errors.js'
import type { PackageManagerName } from './constants.js'

export async function installDeps(
  cwd: string,
  packageManager: PackageManagerName,
  log: Logger
): Promise<void> {
  runCommand({
    command: packageManager,
    args: installArgs(packageManager),
    cwd,
    log,
    label: `Installing dependencies with ${packageManager}`,
    errorMessage: `Dependency installation failed with ${packageManager}.`
  })
}

export async function setupGit(cwd: string, log: Logger): Promise<void> {
  runCommand({
    command: 'git',
    args: ['init'],
    cwd,
    log,
    label: 'Initializing git repository',
    errorMessage: 'Git initialization failed.'
  })

  const renameMainBranch = spawnSync('git', ['branch', '-M', 'main'], {
    cwd,
    stdio: 'ignore',
    shell: process.platform === 'win32'
  })

  if (renameMainBranch.status !== 0) {
    log.warn('Git repository created, but the default branch could not be renamed to "main".')
  }
}

interface RunCommandOptions {
  command: string
  args: string[]
  cwd: string
  log: Logger
  label: string
  errorMessage: string
}

function runCommand(options: RunCommandOptions): void {
  const spinner = options.log.spinner(options.label)
  spinner.stop()

  const result = spawnSync(options.command, options.args, {
    cwd: options.cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })

  if (result.status === 0) {
    spinner.succeed(options.label)
    return
  }

  spinner.fail(options.label)

  if (result.error instanceof Error) {
    throw new CliError(`${options.errorMessage} ${result.error.message}`, 'PROCESS_FAILED')
  }

  throw new CliError(options.errorMessage, 'PROCESS_FAILED')
}

function installArgs(packageManager: PackageManagerName): string[] {
  switch (packageManager) {
    case 'pnpm':
      return ['install']
    case 'yarn':
      return ['install']
    case 'npm':
    default:
      return ['install']
  }
}
