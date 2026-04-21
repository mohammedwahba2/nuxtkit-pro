type AuthUser = {
  id: number
  email: string
  name: string
}

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  user: AuthUser
}

export function useAuth() {
  const userCookie = useCookie<AuthUser | null>('nuxtkit-auth-user', {
    sameSite: 'lax',
    default: () => null
  })
  const tokenCookie = useCookie<string | null>('nuxtkit-auth-token', {
    sameSite: 'lax',
    default: () => null
  })
  const user = useState<AuthUser | null>('auth:user', () => userCookie.value)
  const token = useState<string | null>('auth:token', () => tokenCookie.value)
  const pending = useState<boolean>('auth:pending', () => false)
  const error = useState<string | null>('auth:error', () => null)
  const loggedIn = computed(() => Boolean(token.value && user.value))

  async function login(payload: LoginPayload): Promise<LoginResponse> {
    pending.value = true
    error.value = null

    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: payload
      })

      token.value = response.token
      user.value = response.user
      tokenCookie.value = response.token
      userCookie.value = response.user

      return response
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : 'Unable to complete login'

      error.value = message
      throw cause
    } finally {
      pending.value = false
    }
  }

  async function logout(): Promise<void> {
    token.value = null
    user.value = null
    error.value = null
    tokenCookie.value = null
    userCookie.value = null
    await navigateTo('/login')
  }

  return {
    user,
    token,
    pending,
    error,
    loggedIn,
    login,
    logout
  }
}
