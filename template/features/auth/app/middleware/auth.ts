export default defineNuxtRouteMiddleware((to) => {
  const token = useState<string | null>('auth:token', () => null)
  const user = useState('auth:user', () => null)
  const tokenCookie = useCookie<string | null>('nuxtkit-auth-token', {
    sameSite: 'lax',
    default: () => null
  })
  const userCookie = useCookie('nuxtkit-auth-user', {
    sameSite: 'lax',
    default: () => null
  })

  if (!token.value && tokenCookie.value) {
    token.value = tokenCookie.value
  }

  if (!user.value && userCookie.value) {
    user.value = userCookie.value
  }

  if (!token.value || !user.value) {
    return navigateTo({
      path: '/login',
      query: to.path === '/login' ? {} : { redirect: to.fullPath }
    })
  }
})
