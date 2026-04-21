import { blue, bold, cyan, dim, green, red, yellow } from 'kolorist'
import ora, { type Ora } from 'ora'
import { CLI_VERSION } from './constants.js'

export interface Logger {
  banner(): void
  plain(message: string): void
  info(message: string): void
  warn(message: string): void
  error(message: string): void
  success(message: string): void
  step(message: string): void
  note(message: string): void
  divider(): void
  spinner(message: string): Ora
}

export function logger(): Logger {
  return {
    banner() {
      console.log(bold(cyan(`NuxtKit Pro v${CLI_VERSION}`)))
      console.log(dim('Scaffold Nuxt 4 apps with production-ready starters.'))
      console.log('')
    },
    plain(message) {
      console.log(message)
    },
    info(message) {
      console.log(blue('info'), message)
    },
    warn(message) {
      console.warn(yellow('warn'), message)
    },
    error(message) {
      console.error(red('error'), message)
    },
    success(message) {
      console.log(green('success'), message)
    },
    step(message) {
      console.log(cyan('›'), message)
    },
    note(message) {
      console.log(dim(message))
    },
    divider() {
      console.log(dim('─'.repeat(48)))
    },
    spinner(message) {
      return ora({
        text: message,
        isEnabled: process.stdout.isTTY
      }).start()
    }
  }
}
