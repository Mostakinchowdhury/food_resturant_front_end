import { optionalsettings, settings } from '@/type/self'
import api from '@/utils/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// initial of setting slice

const initialState: {
  setting: settings | null
  isloading: boolean
  error: string
} = {
  setting: null,
  isloading: false,
  error: ''
}

// fetch setting

export const fetchsetting = createAsyncThunk<settings, void>(
  'setting/fetchsetting',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<settings[]>(`settings/`)
      if (response.data.length === 0) throw new Error('setting is empty')
      return response.data[0]
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

// settings update

export const updatesetting = createAsyncThunk<settings, optionalsettings>(
  'setting/update',
  async (optionalsettings, { rejectWithValue }) => {
    try {
      const response = await api.patch<settings>(
        `settings/${optionalsettings.id}/`,
        optionalsettings
      )
      if (response.status != 200) {
        return rejectWithValue('unable to fetch')
      }
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
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
    },
    // clear setting on logout
    clearsetting: (state) => {
      state.setting = null
      state.isloading = false
      state.error = ''
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
export const { updatesettinglocally, clearsetting } = settingslice.actions
