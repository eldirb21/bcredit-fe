import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
