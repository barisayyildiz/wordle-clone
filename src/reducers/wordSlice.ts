import { createSlice } from "@reduxjs/toolkit";
import { selectAWord } from "../lib/util";
import type { RootState } from ".";

type WordSliceState = {
  selectedWord: string
}

const initialState: WordSliceState = {
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
export const selectWord = (state: RootState) => state.word;
export default wordSlice.reducer;
