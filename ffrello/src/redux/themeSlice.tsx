import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
  mode: 'Home'
}

export const themeSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
  },
})

export const { setMode } = themeSlice.actions

export default themeSlice.reducer