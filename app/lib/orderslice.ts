//
import { ordertype } from '@/type/order'
import { optionalsettings, settings } from '@/type/self'
import api from '@/utils/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// initial of setting slice

const initialState: {
  order: ordertype | null
  isloading: boolean
  error: string
} = {
  order: null,
  isloading: false,
  error: ''
}

// fetch orders

export const fetchorder = createAsyncThunk<ordertype[], void>(
  'order/fetchorder',
  async (_, { rejectWithValue }) => {
    
  }
)


// settings slice

const settingslice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updatesettinglocally: (state, action: PayloadAction<optionalsettings>) => {
      console.log('Before:', state.setting)
      if (state.setting) {
        state.setting = { ...state.setting, ...action.payload }
      }
      console.log('After:', state.setting)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchsetting.pending, (state) => {
        state.isloading = true
      })
      .addCase(fetchsetting.rejected, (state, action) => {
        state.isloading = false
        state.error = action.payload as string
      })
      .addCase(fetchsetting.fulfilled, (state, action) => {
        state.isloading = false
        state.setting = action.payload
      })
      .addCase(updatesetting.fulfilled, (state, action) => {
        if (state.setting) {
          state.setting = { ...state.setting, ...action.payload }
        }
      })
  }
})

export default settingslice.reducer
export const { updatesettinglocally } = settingslice.actions
