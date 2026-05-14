import { RootState } from '../index'

export const selectLoading = (state: RootState) => state.app.loading

export const selectLoadingCount = (state: RootState) => state.app.loadingCount

export const selectLoadingRequests = (state: RootState) =>
  state.app.loadingRequests

export const selectAlert = (state: RootState) => state.app.alert

export const selectConfirm = (state: RootState) => state.app.confirm
