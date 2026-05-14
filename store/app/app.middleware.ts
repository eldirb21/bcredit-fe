// ========================================
// AUTO GLOBAL LOADING MIDDLEWARE
// ========================================

import { Middleware } from '@reduxjs/toolkit'

import { startLoading, stopLoading } from './app.slice'

export const appMiddleware: Middleware = (store) => (next) => (action: any) => {
  // ========================================
  // PENDING
  // ========================================

  if (action.type.endsWith('/pending')) {
    store.dispatch(startLoading(action.type))
  }

  // ========================================
  // SUCCESS
  // ========================================

  if (action.type.endsWith('/fulfilled')) {
    store.dispatch(stopLoading(action.type.replace('/fulfilled', '/pending')))
  }

  // ========================================
  // ERROR
  // ========================================

  if (action.type.endsWith('/rejected')) {
    store.dispatch(stopLoading(action.type.replace('/rejected', '/pending')))
  }

  return next(action)
}
