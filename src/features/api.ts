import type { Logger } from '../core/logger.js'
import { applyFeatureDirectory } from './utils.js'

export async function applyApiFeature(
  projectDir: string,
  log: Logger
): Promise<boolean> {
  return applyFeatureDirectory('api', projectDir, log, 'Applying API feature')
}
