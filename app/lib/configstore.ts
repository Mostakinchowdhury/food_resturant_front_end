import authslice from '@/lib/authcreateslice'
import cartslice from '@/lib/cartslice'
import profileslice from '@/lib/profileslice'
import settingslice from '@/lib/settingslice'
import { configureStore } from '@reduxjs/toolkit'
import userslicer from './userslice'

//

const store = configureStore({
  reducer: {
    cart: cartslice, // Add your reducers here
    auth: authslice,
    profile: profileslice,
    setting: settingslice,
    user: userslicer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
//  Example
//  slice
//  (you
//  can
//  replace this
//  with your
//  actual
//  slices)
