import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)

  async function request<T>(callback: () => Promise<T>): Promise<T | null> {
    try {
      setLoading(true)

      const response = await callback()

      return response
    } catch (error: any) {
      console.log('API ERROR => ', error)

      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    request,
  }
}
