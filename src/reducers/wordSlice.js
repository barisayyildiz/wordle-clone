import { createSlice } from "@reduxjs/toolkit";
import { dayHasChanged, selectAWord } from "../lib/util";

// const initialState = {
//   selectedWord: selectAWord(),
// };

const getInitialState = (forceChange = false) => {
  console.log("get initial state");
  try {
    if (dayHasChanged() || forceChange) {
      return {
        selectedWord: selectAWord(),
      };
    }
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).word);
  } catch (e) {
    return {
      selectedWord: selectAWord(),
    };
  }
};

export const wordSlice = createSlice({
  name: "word",
  initialState: getInitialState(),
  reducers: {
    resetWord: () => getInitialState(true),
    // resetWord: (state) => {
    //   state = getInitialState();
    // },
  },
});

export const { resetWord } = wordSlice.actions;
export const selectWord = (state) => state.word;
export default wordSlice.reducer;
