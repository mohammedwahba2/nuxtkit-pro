import { resolveCommand } from './core/args.js'
import { formatError } from './core/errors.js'
import { logger } from './core/logger.js'
import { scaffoldProject } from './core/scaffold.js'

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const log = logger()

  try {
    const command = await resolveCommand(argv, log)

    if (command.type === 'help') {
      log.banner()
      log.plain(command.helpText)
      return
    }

    log.banner()
    await scaffoldProject(command.options, process.cwd(), log)
  } catch (error) {
    log.error(formatError(error))
    process.exitCode = 1
  }
}
