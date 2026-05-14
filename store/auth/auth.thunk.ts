import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  loginService,
  logoutService,
  registerService,
} from '@/services/auth.service'

import { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth'

import { removeTokenStorage, saveTokenStorage } from '@/utils'
import { showAlert } from '../app/app.slice'

// ========================
// REGISTER
// ========================

export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  'auth/register',

  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerService(payload)

      await saveTokenStorage(response.data.token)

      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Register gagal')
    }
  },
)

// ========================
// LOGIN
// ========================

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>(
  'auth/login',

  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginService(payload)

      await saveTokenStorage(response.data.token)

      return response.data
    } catch (error: any) {
      dispatch(
        showAlert({
          title: 'Login Gagal',
          message: error?.message || 'Terjadi kesalahan',
        }),
      )

      return rejectWithValue(error?.message || 'Login gagal')
    }
  },
)

// ========================
// LOGOUT
// ========================

export const logoutThunk = createAsyncThunk(
  'auth/logout',

  async () => {
    await logoutService()

    await removeTokenStorage()

    return true
  },
)
