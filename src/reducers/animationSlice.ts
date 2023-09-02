import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

type AnimationSliceState = {
  failAnimation: boolean,
  finishedAnimation: boolean,
  successAnimation: boolean,
  insertAnimation: boolean,
}

const initialState: AnimationSliceState = {
  failAnimation: false,
  finishedAnimation: false,
  successAnimation: false,
  insertAnimation: false,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setFailAnimation: (state, action) => {
      state.failAnimation = action.payload
    },
    setFinishedAnimation: (state, action) => {
      state.finishedAnimation = action.payload
    },
    setSuccessAnimation: (state, action) => {
      state.successAnimation = action.payload
    },
    setInsertAnimation: (state, action) => {
      state.insertAnimation = action.payload
    }
  },
});

export const {
  setFailAnimation,
  setFinishedAnimation,
  setSuccessAnimation,
  setInsertAnimation,
} = animationSlice.actions;
export const selectAnimation = (state: RootState) => state.animation;
export default animationSlice.reducer;
