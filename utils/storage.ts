import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {}
}

export const getStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {}
}

export const removeStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {}
}

// ========================
// GLOBAL FUNCTIONS TOKEN
// ========================

const TOKEN_KEY = 'ACCESS_TOKEN'

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY)
}

export const saveTokenStorage = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token)
}

export const removeTokenStorage = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY)
}
