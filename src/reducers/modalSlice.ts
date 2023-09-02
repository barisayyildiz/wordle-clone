import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

type ModalSliceState = {
  visible: boolean
}

const initialState: ModalSliceState = {
  visible: false
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.visible = !state.visible;
    },
    close: (state) => {
      state.visible = false
    },
    open: (state) => {
      state.visible = true
    }
  },
});

export const { toggle, close, open } = modalSlice.actions;
export const selectModalStatus = (state: RootState) => state.modal;
export default modalSlice.reducer;
