#!/usr/bin/env node

import { main } from '../src/cli.js'

try {
  await main()
} catch {
  process.exitCode = 1
}
