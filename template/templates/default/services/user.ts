export const useUserApi = () => {
    const { request } = useApi()
  
    const getUsers = () => request('/users')
  
    return { getUsers }
  }