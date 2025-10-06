import { address, createaddress_type, optionaladdress, optionalprofile, profile } from '@/type/self'
import api from '@/utils/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initprofile: { profile: profile | null; isloading: boolean; error: string } = {
  profile: null,
  isloading: false,
  error: ''
}

// fetch profile
export const fetchprofile = createAsyncThunk<profile, void>(
  'profile/fetchprofile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<profile[]>('profiles/')
      if (response.data.length === 0) throw new Error('profile is empty')
      return response.data[0]
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

//  profile partial update

export const updateprofile = createAsyncThunk<profile, any>(
  'profile/updateprofile',
  async (optionalprofile, { rejectWithValue }) => {
    try {
      const response = await api.patch<profile>(
        `profiles/${optionalprofile.id}/`,
        optionalprofile.data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      if (!response.data.id) throw new Error('fail to fetch')
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

// create adress
export const createadress = createAsyncThunk<address, createaddress_type>(
  'cart/createadress',
  async (createaddress, { rejectWithValue }) => {
    try {
      const response = await api.post<address>(`adress/`, createaddress)
      if (!response.data.id) throw new Error('fail to fetch')
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)
// partial update of adress
export const updateadress = createAsyncThunk<address, optionaladdress>(
  'cart/updateadress',
  async (optionaladdress, { rejectWithValue }) => {
    try {
      const response = await api.patch<address>(`adress/${optionaladdress.id}/`, optionaladdress)
      if (!response.data.id) throw new Error('sorry to fetch')
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)
// delete oparetion of adress
export const deleteadress = createAsyncThunk<number, number, { rejectValue: string }>(
  'cart/deleteadress',
  async (addressid, { rejectWithValue }) => {
    try {
      const response = await api.delete(`adress/${addressid}/`)
      if (response.status != 204) throw new Error('sorry to fetch')
      return addressid
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

// profile slice

const profileSlice = createSlice({
  name: 'profile',
  initialState: initprofile,
  reducers: {
    updateprofilelocally: (state, action: PayloadAction<optionalprofile>) => {
      if (state.profile) state.profile = { ...state.profile, ...action.payload }
    },
    updateadresslocally: (state, action: PayloadAction<optionaladdress>) => {
      const finditem = state.profile?.addresses.find((i) => i.id == action.payload.id)
      const finditemindex = state.profile?.addresses.findIndex((i) => i.id == action.payload.id)
      if (state.profile && finditemindex !== undefined && finditemindex !== -1 && finditem) {
        state.profile.addresses[finditemindex] = { ...finditem, ...action.payload }
      }
    },
    deleteadresslocally: (state, action: PayloadAction<number>) => {
      const item = state.profile?.addresses.find((i) => i.id == action.payload)
      if (state.profile && item) {
        state.profile.addresses = state.profile.addresses.filter((i) => i.id != action.payload)
      }
    },
    // change profile img url locally
    changeprofile: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.profile_image = action.payload
      }
    },
    // clear profile on logout
    clearprofile: (state) => {
      state.profile = null
      state.isloading = false
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchprofile.pending, (state) => {
        state.isloading = true
      })
      .addCase(fetchprofile.fulfilled, (state, action: PayloadAction<profile>) => {
        state.isloading = false
        state.profile = action.payload
      })
      .addCase(fetchprofile.rejected, (state, action) => {
        state.isloading = false
        state.error = action.payload as string
      })
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(createadress.fulfilled, (state, action) => {
        state.profile?.addresses.push(action.payload)
      })
      .addCase(createadress.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updateadress.fulfilled, (state, action) => {
        const itmind = state.profile?.addresses.findIndex((i) => i.id == action.payload.id)
        if (state.profile && itmind !== undefined && itmind !== -1) {
          state.profile.addresses[itmind] = action.payload
        }
      })
      .addCase(deleteadress.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.addresses = state.profile.addresses.filter((i) => i.id != action.payload)
        }
      })
  }
})

export default profileSlice.reducer
export const {
  updateprofilelocally,
  updateadresslocally,
  deleteadresslocally,
  clearprofile,
  changeprofile
} = profileSlice.actions
