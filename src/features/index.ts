import type { FeatureName } from '../core/constants.js'
import type { Logger } from '../core/logger.js'
import { applyApiFeature } from './api.js'
import { applyAuthFeature } from './auth.js'
import { applyLintFeature } from './lint.js'
import { applyTailwindFeature } from './tailwind.js'

const featureHandlers: Record<
  FeatureName,
  (projectDir: string, log: Logger) => Promise<boolean>
> = {
  auth: applyAuthFeature,
  api: applyApiFeature,
  tailwind: applyTailwindFeature,
  lint: applyLintFeature
}

export async function applyFeature(
  feature: FeatureName,
  projectDir: string,
  log: Logger
): Promise<boolean> {
  return featureHandlers[feature](projectDir, log)
}
