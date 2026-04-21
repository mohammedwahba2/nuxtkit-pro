export class CliError extends Error {
  readonly code: string

  constructor(message: string, code = 'CLI_ERROR') {
    super(message)
    this.name = 'CliError'
    this.code = code
  }
}

export function formatError(error: unknown): string {
  if (error instanceof CliError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}
