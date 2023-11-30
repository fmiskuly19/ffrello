import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Themes from '../themes/themeIndex'

interface ThemeState {
  theme: string
}

// Define the initial state using that type
const initialState: ThemeState = {
  theme: Themes.Default.name
}

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer