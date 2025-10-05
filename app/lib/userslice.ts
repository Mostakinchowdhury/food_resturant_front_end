import { usertype } from '@/type/user'
import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// fetch user

export const fetchuser = createAsyncThunk<usertype, void, { rejectValue: string }>(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<usertype>('auth/register/')
      if (!response.data.id) throw new Error('user is empty')
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

// partial update user

// export const updateuser = createAsyncThunk<usertype, optionalusertype>(
//   'user/updateuser',
//   async (optionalusertype, { rejectWithValue }) => {
//     try {
//       const response = await api.patch<usertype>(
//         `auth/register/${optionalusertype.id}/`,
//         optionalusertype
//       )
//       if (!response.data.id) throw new Error('fail to fetch')
//       return response.data
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message)
//       }
//       return rejectWithValue('Unknown error')
//     }
//   }

const initialState: { user: usertype | null; isloading: boolean; error: string } = {
  user: null,
  isloading: false,
  error: ''
}
const userslicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // clear user on logout
    clearuser: (state) => {
      state.user = null
      state.isloading = false
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuser.pending, (state) => {
        state.isloading = true
      })
      .addCase(fetchuser.rejected, (state, action) => {
        state.isloading = false
        state.error = action.payload as string
      })
      .addCase(fetchuser.fulfilled, (state, action) => {
        state.isloading = false
        state.user = action.payload
      })
  }
})

export const { clearuser } = userslicer.actions

export default userslicer.reducer
