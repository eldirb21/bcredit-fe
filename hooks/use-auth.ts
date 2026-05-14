import AsyncStorage from '@react-native-async-storage/async-storage'

import { useCallback, useEffect, useState } from 'react'

const TOKEN_KEY = 'ACCESS_TOKEN'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  // CHECK TOKEN
  const checkAuth = useCallback(async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY)

      setToken(storedToken)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // SAVE TOKEN
  const saveToken = async (newToken: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, newToken)

    setToken(newToken)
  }

  // REMOVE TOKEN
  const removeToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY)

    setToken(null)
  }

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    token,
    isLoading,

    saveToken,
    removeToken,
    checkAuth,

    isAuthenticated: !!token,
  }
}
