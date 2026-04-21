export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  if (body.email !== 'admin@nuxtkit.dev' || body.password !== 'nuxtkit') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  return {
    token: 'nuxtkit-session-token',
    user: {
      id: 1,
      email: 'admin@nuxtkit.dev',
      name: 'NuxtKit Admin'
    }
  }
})
