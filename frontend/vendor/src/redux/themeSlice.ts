
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  darkMode: boolean
}

const initialState: ThemeState = {
  darkMode: localStorage.getItem('theme') === 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light')
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
      localStorage.setItem('theme', action.payload ? 'dark' : 'light')
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer