import { createSlice } from "@reduxjs/toolkit";
import { dayHasChanged, selectAWord } from "../lib/util";

const initialState = {
  selectedWord: selectAWord(),
};

const getInitialState = () => {
  try {
    if (dayHasChanged()) {
      console.log("day has changed");
      return initialState;
    }
    console.log("day has not changed");
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).word);
  } catch (e) {
    console.log("localstorage is empty");
    return initialState;
  }
};

export const wordSlice = createSlice({
  name: "word",
  initialState: {
    selectedWord: selectAWord(),
  },
  reducers: {
    resetWord: () => initialState,
  },
});

export const { resetWord } = wordSlice.actions;
export const selectWord = (state) => state.word;
export default wordSlice.reducer;
