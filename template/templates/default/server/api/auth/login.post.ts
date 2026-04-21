export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return {
    token: 'fake-token-123',
    user: {
      name: body.email
    }
  }
})