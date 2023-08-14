import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
const cookie = new Cookies()
interface State {
  theme: string
  themeReverse: string
  rememberPassword: boolean
  user: {
    id: number | undefined
    username: string
    name: string
    roles: Array<string>
  }
  token: string
}

const initialState: State = {
  theme: '',
  themeReverse: '',
  rememberPassword: false,
  user: {
    id: undefined,
    username: '',
    name: '',
    roles: []
  },
  token: ''
}

export const logout = createAsyncThunk('globalReducer/logout', async () => {
  cookie.remove('token')
  cookie.remove('sessionExpiration')
})

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setGlobalValues: (state, action: PayloadAction<{ field: keyof State; value: any }>) => {
      const { field, value } = action.payload

      state[field] = value as never
    },
    resetUser: (state) => {
      state.user = initialState.user
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
    }
  },

  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = initialState.user
    })
  }
})

export const { setGlobalValues, resetUser, setToken } = globalSlice.actions

export default globalSlice.reducer
