import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Fields {
  username: string
  password: string
  passwordConfirmation: string
}

interface State {
  fields: Fields
}

const initialState: State = {
  fields: {
    username: '',
    password: '',
    passwordConfirmation: ''
  }
}

export const loginSlice = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    setLoginFieldsValues: (state, action: PayloadAction<{ field: keyof Fields; value: any }>) => {
      const { field, value } = action.payload
      state.fields[field] = value as Fields[keyof Fields]
    },
    resetUserFields: (state) => {
      state.fields = initialState.fields
    }
  }
})

export const { setLoginFieldsValues, resetUserFields } = loginSlice.actions

export default loginSlice.reducer
