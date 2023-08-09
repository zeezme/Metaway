import { createSlice } from '@reduxjs/toolkit'

interface State {
  theme: string
}

const initialState: State = {
  theme: 'light'
}

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setTestValues: (state, action) => {
      state.theme = action.payload.value
    }
    /*  extraReducers: (builder) => {
    builder.addCase(test.fulfilled, (state, action) => {
      state.test = action.payload
    })
  } */
  }
})

export const { setTestValues } = globalSlice.actions

export default globalSlice.reducer
