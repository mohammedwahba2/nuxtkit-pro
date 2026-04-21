import type { Logger } from '../core/logger.js'
import { applyFeatureDirectory } from './utils.js'

export async function applyAuthFeature(
  projectDir: string,
  log: Logger
): Promise<boolean> {
  return applyFeatureDirectory('auth', projectDir, log, 'Applying auth feature')
}
