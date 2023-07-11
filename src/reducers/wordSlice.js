import { createSlice } from "@reduxjs/toolkit";
import { selectAWord } from "../lib/util";

const initialState = {
  selectedWord: selectAWord(),
};

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    resetWord: () => {
      return({
        selectedWord: selectAWord()
      })
    },
  },
});

export const { resetWord } = wordSlice.actions;
export const selectWord = (state) => state.word;
export default wordSlice.reducer;
