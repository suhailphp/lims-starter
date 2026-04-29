/* REUSABLE */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '@/types/auth'

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.isInitialized = true
    },
    clearCredentials(state) {
      state.accessToken = null
      state.user = null
      state.isInitialized = true
    },
    setInitialized(state) {
      state.isInitialized = true
    },
  },
})

export const { setCredentials, clearCredentials, setInitialized } = authSlice.actions
export default authSlice.reducer
