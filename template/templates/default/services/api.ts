export const useApi = () => {
  const config = useRuntimeConfig()

  const request = async (url: string, options: any = {}) => {
    const token = useState<string | null>('token')

    try {
      return await $fetch(url, {
        baseURL: config.public.apiBase || '/api',
        headers: {
          ...(token.value && {
            Authorization: `Bearer ${token.value}`
          })
        },
        ...options
      })
    } catch (error: any) {
      console.error('API Error:', error?.data || error)

      throw error?.data || error
    }
  }

  return { request }
}