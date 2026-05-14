export interface AlertPayload {
  title: string
  message: string
}

export interface ConfirmPayload {
  title: string
  message: string
  onConfirm?: () => void
}

export interface AppState {
  // ========================================
  // GLOBAL LOADING
  // ========================================

  loading: boolean

  loadingCount: number

  loadingRequests: string[]

  // ========================================
  // ALERT
  // ========================================

  alert: {
    visible: boolean
    title: string
    message: string
  }

  // ========================================
  // CONFIRM
  // ========================================

  confirm: {
    visible: boolean
    title: string
    message: string
    onConfirm?: () => void
  }
}
