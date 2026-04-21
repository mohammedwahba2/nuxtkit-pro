import { spawnSync } from 'node:child_process'
import type { Logger } from './logger.js'
import { CliError } from './errors.js'
import type { PackageManagerName } from './constants.js'

export async function installDeps(
  cwd: string,
  packageManager: PackageManagerName,
  log: Logger
): Promise<void> {
  log.step(`Installing dependencies with ${packageManager}`)

  const result = spawnSync(packageManager, installArgs(packageManager), {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })

  if (result.status !== 0) {
    throw new CliError('Dependency installation failed', 'INSTALL_FAILED')
  }
}

export async function setupGit(cwd: string, log: Logger): Promise<void> {
  const gitInit = spawnSync('git', ['init'], {
    cwd,
    stdio: 'ignore',
    shell: process.platform === 'win32'
  })

  if (gitInit.status !== 0) {
    throw new CliError('Git initialization failed', 'GIT_INIT_FAILED')
  }

  spawnSync('git', ['branch', '-M', 'main'], {
    cwd,
    stdio: 'ignore',
    shell: process.platform === 'win32'
  })

  log.success('Initialized git repository')
}

function installArgs(packageManager: PackageManagerName): string[] {
  switch (packageManager) {
    case 'pnpm':
      return ['install']
    case 'yarn':
      return ['install']
    case 'bun':
      return ['install']
    default:
      return ['install']
  }
}
