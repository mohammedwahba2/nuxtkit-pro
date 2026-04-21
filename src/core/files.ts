import path from 'node:path'
import fs from 'fs-extra'
import { CRITICAL_PATHS } from './constants.js'
import { CliError } from './errors.js'
import { mergePackageJson } from './package-json.js'

export interface MergeOptions {
  overwrite?: boolean
  protectExistingCritical?: boolean
}

export async function ensureEmptyTarget(targetDir: string): Promise<void> {
  if (await fs.pathExists(targetDir)) {
    throw new CliError(`Target directory already exists: ${path.basename(targetDir)}`)
  }

  await fs.ensureDir(targetDir)
}

export async function mergeFeature(
  sourceDir: string,
  targetDir: string,
  options: MergeOptions = {}
): Promise<void> {
  const { overwrite = true, protectExistingCritical = true } = options

  if (!(await fs.pathExists(sourceDir))) {
    throw new CliError(`Missing scaffold source: ${sourceDir}`)
  }

  await copyDirectory(sourceDir, targetDir, targetDir, overwrite, protectExistingCritical)
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
      await copyDirectory(sourcePath, targetPath, rootTargetDir, overwrite, protectExistingCritical)
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
      continue
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
