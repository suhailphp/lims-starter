/* REUSABLE */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

const initialTheme = getStoredTheme()
applyTheme(initialTheme)

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initialTheme as Theme },
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.mode = action.payload
      applyTheme(action.payload)
    },
    toggleTheme(state) {
      const next: Theme = state.mode === 'light' ? 'dark' : 'light'
      state.mode = next
      applyTheme(next)
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
