import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isMinisidebarActive: boolean
  isMobileMenuOpen: boolean
}
                                                       
const initialState: UIState = {
  isMinisidebarActive: false,
  isMobileMenuOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMinisidebar: (state) => {
      state.isMinisidebarActive = !state.isMinisidebarActive
    },
    setMinisidebar: (state, action: PayloadAction<boolean>) => {
      state.isMinisidebarActive = action.payload
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    setMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
  },
})

export const { toggleMinisidebar, setMinisidebar, toggleMobileMenu, setMobileMenu, closeMobileMenu } = uiSlice.actions
export default uiSlice.reducer
