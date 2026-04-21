export const useAuth = () => {
  const user = useState<any>('user', () => null)

  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    sameSite: 'lax'
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const { login: loginApi, me } = useAuthApi()
  const { show } = useToast()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (data: { email: string; password: string }) => {
    loading.value = true
    error.value = null

    try {
      const res: any = await loginApi(data)

      token.value = res.token
      user.value = res.user

      show('Login successful ✅')

      await navigateTo('/')
    } catch (err: any) {
      error.value = err?.message || 'Login failed'
      show(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    token.value = null
    user.value = null

    show('Logged out 👋')
    await navigateTo('/login')
  }

  // 🔥 auto fetch user after refresh
  const fetchUser = async () => {
    if (!token.value) return

    try {
      const res: any = await me()
      user.value = res
    } catch (e) {
      logout()
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchUser
  }
}