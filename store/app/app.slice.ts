// ========================================
// SUPER ADVANCED GLOBAL UI STATE
// ========================================

import { AlertPayload, AppState, ConfirmPayload } from '@/types/app'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppState = {
  // ========================================
  // LOADING
  // ========================================

  loading: false,

  loadingCount: 0,

  loadingRequests: [],

  // ========================================
  // ALERT
  // ========================================

  alert: {
    visible: false,
    title: '',
    message: '',
  },

  // ========================================
  // CONFIRM
  // ========================================

  confirm: {
    visible: false,
    title: '',
    message: '',
  },
}

const appSlice = createSlice({
  name: 'app',

  initialState,

  reducers: {
    // ========================================
    // START LOADING
    // ========================================

    startLoading: (state, action: PayloadAction<string>) => {
      const requestId = action.payload

      const exists = state.loadingRequests.includes(requestId)

      if (!exists) {
        state.loadingRequests.push(requestId)

        state.loadingCount += 1
      }

      state.loading = state.loadingCount > 0
    },

    // ========================================
    // STOP LOADING
    // ========================================

    stopLoading: (state, action: PayloadAction<string>) => {
      const requestId = action.payload

      state.loadingRequests = state.loadingRequests.filter(
        (item) => item !== requestId,
      )

      state.loadingCount = state.loadingRequests.length

      state.loading = state.loadingCount > 0
    },

    // ========================================
    // RESET LOADING
    // ========================================

    resetLoading: (state) => {
      state.loading = false

      state.loadingCount = 0

      state.loadingRequests = []
    },

    // ========================================
    // ALERT
    // ========================================

    showAlert: (state, action: PayloadAction<AlertPayload>) => {
      state.alert.visible = true

      state.alert.title = action.payload.title

      state.alert.message = action.payload.message
    },

    hideAlert: (state) => {
      state.alert.visible = false
    },

    // ========================================
    // CONFIRM
    // ========================================

    showConfirm: (state, action: PayloadAction<ConfirmPayload>) => {
      state.confirm.visible = true

      state.confirm.title = action.payload.title

      state.confirm.message = action.payload.message

      state.confirm.onConfirm = action.payload.onConfirm
    },

    hideConfirm: (state) => {
      state.confirm.visible = false
    },
  },
})

export const {
  startLoading,
  stopLoading,
  resetLoading,

  showAlert,
  hideAlert,

  showConfirm,
  hideConfirm,
} = appSlice.actions

export default appSlice.reducer
