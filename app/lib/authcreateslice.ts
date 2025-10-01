import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isloading: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isloading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },

    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },

    loadTokensFromStorage: (state) => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if (accessToken && refreshToken) {
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.isAuthenticated = true
      }
    },
    toogleauthloading: (state, action: PayloadAction<boolean>) => {
      state.isloading = action.payload
    },
    toogleauthenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    }
  }
})

export const {
  loginSuccess,
  logout,
  loadTokensFromStorage,
  toogleauthloading,
  toogleauthenticate
} = authSlice.actions
const slice = { reducer: authSlice.reducer, name: authSlice.name }
export default slice.reducer
