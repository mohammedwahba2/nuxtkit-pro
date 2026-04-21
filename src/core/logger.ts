import { blue, cyan, dim, green, red, yellow } from 'kolorist'
import ora, { type Ora } from 'ora'
import { CLI_VERSION } from './constants.js'

export interface Logger {
  banner(): void
  info(message: string): void
  warn(message: string): void
  error(message: string): void
  success(message: string): void
  step(message: string): void
  note(message: string): void
  spinner(message: string): Ora
}

export function logger(): Logger {
  return {
    banner() {
      console.log(cyan(`NuxtKit Pro v${CLI_VERSION}`))
      console.log(dim('Nuxt 4 project scaffolder'))
      console.log('')
    },
    info(message) {
      console.log(blue('i'), message)
    },
    warn(message) {
      console.warn(yellow('!'), message)
    },
    error(message) {
      console.error(red('x'), message)
    },
    success(message) {
      console.log(green('√'), message)
    },
    step(message) {
      console.log(cyan('›'), message)
    },
    note(message) {
      console.log(dim(message))
    },
    spinner(message) {
      return ora({
        text: message,
        isEnabled: process.stdout.isTTY
      }).start()
    }
  }
}
