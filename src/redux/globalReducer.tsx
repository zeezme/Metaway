import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  theme: string
  themeReverse: string
}

const initialState: State = {
  theme: 'light',
  themeReverse: 'dark'
}

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    //!!
    setGlobalValues: (state, action: PayloadAction<{ field: keyof State; value: string }>) => {
      state[action.payload.field] = action.payload.value
    }
    /*  extraReducers: (builder) => {
    builder.addCase(test.fulfilled, (state, action) => {
      state.test = action.payload
    })
  } */
  }
})

export const { setGlobalValues } = globalSlice.actions

export default globalSlice.reducer
