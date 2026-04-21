import path from 'node:path'
import fs from 'fs-extra'
import type { Logger } from '../core/logger.js'
import { CliError } from '../core/errors.js'
import { applyFeatureDirectory } from './utils.js'

export async function applyTailwindFeature(
  projectDir: string,
  log: Logger
): Promise<boolean> {
  const applied = await applyFeatureDirectory(
    'tailwind',
    projectDir,
    log,
    'Applying Tailwind feature'
  )

  if (!applied) {
    return false
  }

  const nuxtConfigPath = path.join(projectDir, 'nuxt.config.ts')

  try {
    let contents = await fs.readFile(nuxtConfigPath, 'utf8')

    if (!contents.includes('@nuxtjs/tailwindcss')) {
      contents = contents.replace(
        'modules: [],',
        "modules: ['@nuxtjs/tailwindcss'],"
      )
    }

    if (!contents.includes('~/app/assets/css/tailwind.css')) {
      contents = contents.replace(
        'css: [],',
        "css: ['~/app/assets/css/tailwind.css'],"
      )
    }

    await fs.writeFile(nuxtConfigPath, contents)
    return true
  } catch (error) {
    throw new CliError(
      error instanceof Error
        ? `Unable to update nuxt.config.ts for Tailwind. ${error.message}`
        : 'Unable to update nuxt.config.ts for Tailwind.',
      'TAILWIND_SETUP_FAILED'
    )
  }
}
