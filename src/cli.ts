import { resolveOptions } from './core/args.js'
import { formatError } from './core/errors.js'
import { logger } from './core/logger.js'
import { scaffoldProject } from './core/scaffold.js'

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const log = logger()
  log.banner()

  try {
    const options = await resolveOptions(argv, log)
    await scaffoldProject(options, process.cwd(), log)
  } catch (error) {
    log.error(formatError(error))
    log.note('')
    process.exitCode = 1
  }
}
