import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Themes from '../themes/themeIndex'
import { FFrelloTheme } from '../types/FFrelloTheme'

interface ThemeState {
  currentThemeName: string,
  themes: any[]
}

// Define the initial state using that type
const initialState: ThemeState = {
  currentThemeName: Themes.Default.name,
  themes: [Themes.Default, Themes.FrutigerAero, Themes.CatsTheme]
}

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    addTheme: (state, action: PayloadAction<FFrelloTheme>) => {
      state.themes = [
        ...state.themes,
        action.payload,
      ];
    },
    setCurrentThemeName: (state, action: PayloadAction<string>) => {
      state.currentThemeName = action.payload
    },

  },
})

export const { setCurrentThemeName, addTheme } = themeSlice.actions

export default themeSlice.reducer