import type { Logger } from '../core/logger.js'
import { applyFeatureDirectory } from './utils.js'

export async function applyLintFeature(
  projectDir: string,
  log: Logger
): Promise<boolean> {
  return applyFeatureDirectory('lint', projectDir, log, 'Applying linting feature')
}
