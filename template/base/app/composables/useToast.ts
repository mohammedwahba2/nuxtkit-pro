export const useToast = () => {
    const toasts = useState<any[]>('toasts', () => [])
  
    const show = (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now()
  
      toasts.value.push({ id, message, type })
  
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 3000)
    }
  
    return { toasts, show }
  }