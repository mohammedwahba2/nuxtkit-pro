import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

export const CLI_NAME = 'nuxtkit-pro'

export const AVAILABLE_TEMPLATES = [
  'default',
  'dashboard',
  'landing',
  'saas'
] as const

export const AVAILABLE_FEATURES = [
  'auth',
  'api',
  'tailwind',
  'lint'
] as const

export const AVAILABLE_PACKAGE_MANAGERS = [
  'npm',
  'pnpm',
  'yarn',
  'bun'
] as const

export type TemplateName = (typeof AVAILABLE_TEMPLATES)[number]
export type FeatureName = (typeof AVAILABLE_FEATURES)[number]
export type PackageManagerName = (typeof AVAILABLE_PACKAGE_MANAGERS)[number]

const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)

export const ROOT_DIR = path.resolve(currentDir, '../../..')
export const TEMPLATE_ROOT = path.resolve(ROOT_DIR, 'template')
export const BASE_TEMPLATE_DIR = path.resolve(TEMPLATE_ROOT, 'base')
export const TEMPLATE_VARIANTS_DIR = path.resolve(TEMPLATE_ROOT, 'templates')
export const FEATURE_ROOT_DIR = path.resolve(TEMPLATE_ROOT, 'features')
export const CLI_VERSION = readVersion()

export const CRITICAL_PATHS = new Set([
  '.git',
  '.gitignore',
  '.npmrc',
  '.yarnrc',
  '.yarnrc.yml',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb'
])

function readVersion(): string {
  try {
    const packageJsonPath = path.join(ROOT_DIR, 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
      version?: string
    }

    return packageJson.version ?? '0.1.0'
  } catch {
    return '0.1.0'
  }
}
