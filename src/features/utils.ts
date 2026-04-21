import path from 'node:path'
import fs from 'fs-extra'
import { FEATURE_ROOT_DIR, type FeatureName } from '../core/constants.js'
import { mergeFeature } from '../core/files.js'
import type { Logger } from '../core/logger.js'

export async function applyFeatureDirectory(
  feature: FeatureName,
  projectDir: string,
  log: Logger,
  label: string
): Promise<boolean> {
  const sourceDir = path.join(FEATURE_ROOT_DIR, feature)

  if (!(await fs.pathExists(sourceDir))) {
    log.warn(`Feature "${feature}" is not available in this installation. Skipping.`)
    return false
  }

  log.step(label)
  await mergeFeature(sourceDir, projectDir)
  return true
}
