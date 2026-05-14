import { ApiResponse } from '@/types/api'
import { AxiosRequestConfig } from 'axios'
import { api } from '../utils/api'

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.get<ApiResponse<T>>(url, config)

  return response.data
}

export async function apiPost<T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.post<ApiResponse<T>>(url, body, config)

  return response.data
}

export async function apiPut<T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.put<ApiResponse<T>>(url, body, config)

  return response.data
}

export async function apiPatch<T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.patch<ApiResponse<T>>(url, body, config)

  return response.data
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.delete<ApiResponse<T>>(url, config)

  return response.data
}
