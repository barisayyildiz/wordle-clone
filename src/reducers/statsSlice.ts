import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

type StatSliceState = {
  played: number,
  win: number,
  curStreak: number,
  maxStreak: number,
  distribution: Array<number>,
  active: any
}

const initialState: StatSliceState = {
  played: 0,
  win: 0,
  curStreak: 0,
  maxStreak: 0,
  distribution: Array(6).fill(0),
  active: null,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    handleWin: (state) => {
      state.win = state.win + 1;
      state.played = state.played + 1;
      state.curStreak = state.curStreak + 1;
      if (state.curStreak + 1 >= state.maxStreak) {
        state.maxStreak = state.curStreak;
      }
    },
    handleFail: (state) => {
      state.played = state.played + 1;
      state.curStreak = 0;
    },
    setActive: (state, { payload }) => {
      state.active = payload;
      state.distribution = state.distribution.map((item, index) => {
        if (index + 1 == payload) {
          return item + 1;
        }
        return item;
      });
    },
  },
});

export const {
  handleWin,
  setActive,
  handleFail,
} = statsSlice.actions;
export const selectStats = (state: RootState) => state.stats;
export default statsSlice.reducer;
