export const useAuthApi = () => {
    const { request } = useApi()
  
    const login = async (data: { email: string; password: string }) => {
      return request('/auth/login', {
        method: 'POST',
        body: data
      })
    }
  
    const me = async () => {
      return request('/auth/me')
    }
  
    return { login, me }
  }