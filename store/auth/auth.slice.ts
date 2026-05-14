import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AuthState } from '@/types/auth'

import { loginThunk, logoutThunk, registerThunk } from './auth.thunk'

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ========================
    // SUCCESS
    // ========================

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false

      state.user = action.payload.user
      state.token = action.payload.token
    })

    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false

      state.user = action.payload.user
      state.token = action.payload.token
    })

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null
      state.token = null
    })

    // ========================
    // GLOBAL PENDING
    // ========================

    builder.addMatcher(
      isAnyOf(loginThunk.pending, registerThunk.pending),
      (state) => {
        state.loading = true
        state.error = null
      },
    )

    // ========================
    // GLOBAL ERROR
    // ========================

    builder.addMatcher(
      isAnyOf(loginThunk.rejected, registerThunk.rejected),
      (state, action) => {
        state.loading = false

        state.error = action.payload || 'Terjadi kesalahan'
      },
    )
  },
})

export default authSlice.reducer
