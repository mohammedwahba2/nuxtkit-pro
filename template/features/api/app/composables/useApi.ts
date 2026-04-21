import { apiService } from '~/services/api'

export function useApi() {
  const hello = () => apiService.getHello()

  return {
    hello
  }
}
