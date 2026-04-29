import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppLayoutMode } from "./layoutDom";

interface LayoutState {
  activeLayout: AppLayoutMode;
}

const initialState: LayoutState = {
  activeLayout: "default",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<Exclude<AppLayoutMode, "default">>) => {
      if (state.activeLayout !== action.payload) {
        state.activeLayout = action.payload;
      }
    },
    resetLayout: (state) => {
      if (state.activeLayout !== "default") {
        state.activeLayout = "default";
      }
    },
  },
});

export const { setLayout, resetLayout } = layoutSlice.actions;
export default layoutSlice.reducer;

export const selectActiveLayout = (state: { layout: LayoutState }) =>
  state.layout.activeLayout;
