import path from 'node:path'
import fs from 'fs-extra'
import { FEATURE_ROOT_DIR } from '../core/constants.js'
import { mergeFeature } from '../core/files.js'
import type { Logger } from '../core/logger.js'

export async function applyTailwindFeature(projectDir: string, log: Logger): Promise<void> {
  log.step('Applying Tailwind feature')
  await mergeFeature(path.join(FEATURE_ROOT_DIR, 'tailwind'), projectDir)

  const nuxtConfigPath = path.join(projectDir, 'nuxt.config.ts')
  let contents = await fs.readFile(nuxtConfigPath, 'utf8')

  if (!contents.includes('@nuxtjs/tailwindcss')) {
    contents = contents.replace(
      'modules: [],',
      "modules: ['@nuxtjs/tailwindcss'],"
    )
  }

  if (!contents.includes('~/app/assets/css/tailwind.css')) {
    contents = contents.replace(
      "css: [],",
      "css: ['~/app/assets/css/tailwind.css'],"
    )
  }

  await fs.writeFile(nuxtConfigPath, contents)
}
