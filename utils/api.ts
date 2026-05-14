import {} from '@/hooks/use-auth'
import axios from 'axios'
import { getToken, removeTokenStorage } from './storage'
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await getToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status

    const message = error?.response?.data?.message || 'Terjadi kesalahan'

    if (status === 401) await removeTokenStorage()

    return Promise.reject({
      status,
      message,
    })
  },
)
