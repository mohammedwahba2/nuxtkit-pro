export const apiService = {
  async getHello() {
    return await $fetch<{ message: string; timestamp: string }>('/api/hello')
  }
}
