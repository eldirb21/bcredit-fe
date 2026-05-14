import { configureStore } from '@reduxjs/toolkit'

import { appMiddleware } from './app/app.middleware'
import appReducer from './app/app.slice'
import authReducer from './auth/auth.slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
