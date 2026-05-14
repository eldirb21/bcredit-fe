import { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth'
import { apiPost } from './request'

export const loginService = async (payload: LoginPayload) => {
  return apiPost<AuthResponse>('/auth/login', payload)
}

export const registerService = async (payload: RegisterPayload) => {
  return apiPost<AuthResponse>('/auth/register', payload)
}

export const logoutService = async () => {
  return apiPost<null>('/auth/logout')
}
