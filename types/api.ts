export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

export interface PaginationResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  success: false
  message: string
}
