import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  theme: string
  themeReverse: string
  rememberPassword: boolean
  user: {
    username: string
    roles: Array<string>
  }
}

const initialState: State = {
  theme: 'light',
  themeReverse: 'dark',
  rememberPassword: false,
  user: {
    username: '',
    roles: []
  }
}

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setGlobalValues: (state, action: PayloadAction<{ field: keyof State; value: any }>) => {
      const { field, value } = action.payload
      // eslint-disable-next-line
      // @ts-ignore
      state[field] = value
    }
  }
})

export const { setGlobalValues } = globalSlice.actions

export default globalSlice.reducer
