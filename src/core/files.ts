import path from 'node:path'
import fs from 'fs-extra'
import { CRITICAL_PATHS } from './constants.js'
import { CliError } from './errors.js'
import { mergePackageJson } from './package-json.js'

export interface MergeOptions {
  overwrite?: boolean
  protectExistingCritical?: boolean
}

export async function ensureTargetDirectory(targetDir: string): Promise<void> {
  try {
    if (!(await fs.pathExists(targetDir))) {
      await fs.ensureDir(targetDir)
      return
    }

    const entries = await fs.readdir(targetDir)

    if (entries.length > 0) {
      throw new CliError(
        `Target directory "${path.basename(targetDir)}" already exists and is not empty.`,
        'TARGET_NOT_EMPTY'
      )
    }
  } catch (error) {
    throw asCliError(error, `Unable to prepare target directory "${targetDir}".`)
  }
}

export async function mergeFeature(
  sourceDir: string,
  targetDir: string,
  options: MergeOptions = {}
): Promise<void> {
  const { overwrite = true, protectExistingCritical = true } = options

  try {
    if (!(await fs.pathExists(sourceDir))) {
      throw new CliError(`Missing scaffold source: ${sourceDir}`, 'MISSING_SOURCE')
    }

    await copyDirectory(
      sourceDir,
      targetDir,
      targetDir,
      overwrite,
      protectExistingCritical
    )
  } catch (error) {
    throw asCliError(
      error,
      `Unable to copy files from "${path.basename(sourceDir)}" into the project.`
    )
  }
}

async function copyDirectory(
  sourceDir: string,
  targetDir: string,
  rootTargetDir: string,
  overwrite: boolean,
  protectExistingCritical: boolean
): Promise<void> {
  const entries = await fs.readdir(sourceDir)

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry)
    const targetPath = path.join(targetDir, entry)
    const stat = await fs.stat(sourcePath)

    if (stat.isDirectory()) {
      await fs.ensureDir(targetPath)
      await copyDirectory(
        sourcePath,
        targetPath,
        rootTargetDir,
        overwrite,
        protectExistingCritical
      )
      continue
    }

    const relativePath = path.relative(rootTargetDir, targetPath)

    if (
      protectExistingCritical &&
      (isCriticalPath(relativePath) || isEnvFile(relativePath)) &&
      (await fs.pathExists(targetPath))
    ) {
      continue
    }

    if (entry === 'package.json') {
      await mergePackageJson(sourcePath, targetPath)
      continue
    }

    if (!overwrite && (await fs.pathExists(targetPath))) {
      throw new CliError(
        `A file already exists at "${relativePath}". Re-run in an empty directory or remove the conflicting file.`,
        'COPY_CONFLICT'
      )
    }

    await fs.copy(sourcePath, targetPath, { overwrite })
  }
}

function isCriticalPath(relativePath: string): boolean {
  const normalized = relativePath.split(path.sep).join('/')

  if (CRITICAL_PATHS.has(normalized)) {
    return true
  }

  return normalized.startsWith('.git/')
}

function isEnvFile(relativePath: string): boolean {
  return relativePath === '.env' || relativePath.startsWith('.env.')
}

function asCliError(error: unknown, fallbackMessage: string): CliError {
  if (error instanceof CliError) {
    return error
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'EEXIST'
  ) {
    return new CliError(
      'A file conflict was detected while copying the scaffold. Re-run in an empty directory.',
      'COPY_CONFLICT'
    )
  }

  if (error instanceof Error && error.message.trim()) {
    return new CliError(`${fallbackMessage} ${error.message}`, 'FILE_OPERATION_FAILED')
  }

  return new CliError(fallbackMessage, 'FILE_OPERATION_FAILED')
}
