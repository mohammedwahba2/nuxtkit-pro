import path from 'node:path'
import { FEATURE_ROOT_DIR } from '../core/constants.js'
import { mergeFeature } from '../core/files.js'
import type { Logger } from '../core/logger.js'

export async function applyApiFeature(projectDir: string, log: Logger): Promise<void> {
  log.step('Applying API feature')
  await mergeFeature(path.join(FEATURE_ROOT_DIR, 'api'), projectDir)
}
