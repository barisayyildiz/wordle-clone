import { createSlice } from "@reduxjs/toolkit";
import { dayHasChanged } from "../lib/util";

const initialState = {
  isGameOver: false,
  guessedArray: [],
  numberOfGuesses: 0,
  onNthGuess: null,
  boardColors: [],
  guessedLetters: [],
};

const getInitialState = () => {
  try {
    if (dayHasChanged()) {
      return initialState;
    }
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).game);
  } catch (e) {
    return initialState;
  }
};

export const gameSlice = createSlice({
  name: "game",
  initialState: getInitialState(),
  reducers: {
    setGuessedArray: (state, { payload }) => {
      state.guessedArray = payload;
    },
    setIsGameOver: (state, { payload }) => {
      state.isGameOver = payload;
    },
    setBoardColors: (state, { payload }) => {
      state.boardColors = payload;
    },
    setGuessedLetters: (state, { payload }) => {
      state.guessedLetters = payload;
    },
  },
});

export const {
  setGuessedArray,
  setIsGameOver,
  setBoardColors,
  setGuessedLetters,
} = gameSlice.actions;
export const selectGame = (state) => state.game;
export default gameSlice.reducer;
