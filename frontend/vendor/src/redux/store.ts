import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice'
import uiReducer from './uiSlice'
import layoutReducer from './layoutSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
