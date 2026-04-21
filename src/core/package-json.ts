import fs from 'fs-extra'

export interface PackageJsonShape {
  name?: string
  version?: string
  private?: boolean
  type?: string
  packageManager?: string
  scripts?: Record<string, unknown>
  dependencies?: Record<string, unknown>
  devDependencies?: Record<string, unknown>
  peerDependencies?: Record<string, unknown>
  [key: string]: unknown
}

const MERGE_KEYS = [
  'scripts',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'lint-staged'
] as const

export async function mergePackageJson(
  sourcePath: string,
  targetPath: string
): Promise<void> {
  const source = (await fs.readJson(sourcePath)) as PackageJsonShape

  if (!(await fs.pathExists(targetPath))) {
    await fs.writeJson(targetPath, source, { spaces: 2 })
    return
  }

  const target = (await fs.readJson(targetPath)) as PackageJsonShape
  const merged: PackageJsonShape = {
    ...target,
    ...copyMissingScalars(target, source)
  }

  for (const key of MERGE_KEYS) {
    const nextValue = source[key]
    const currentValue = target[key]

    if (isObject(currentValue) || isObject(nextValue)) {
      merged[key] = {
        ...(currentValue as Record<string, unknown> | undefined),
        ...(nextValue as Record<string, unknown> | undefined)
      }
    }
  }

  await fs.writeJson(targetPath, merged, { spaces: 2 })
}

function copyMissingScalars(
  target: PackageJsonShape,
  source: PackageJsonShape
): PackageJsonShape {
  const next: PackageJsonShape = {}

  for (const [key, value] of Object.entries(source)) {
    if (MERGE_KEYS.includes(key as (typeof MERGE_KEYS)[number])) {
      continue
    }

    if (target[key] === undefined) {
      next[key] = value
    }
  }

  return next
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
