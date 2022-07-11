import { createSlice } from "@reduxjs/toolkit";
import { dayHasChanged } from "../lib/util";

const initialState = {
  isGameOver: false,
  isGameWon: false,
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
    setIsGameWon: (state, { payload }) => {
      state.isGameWon = payload;
    },
    setBoardColors: (state, { payload }) => {
      console.log(payload);
      state.boardColors = payload;
    },
    setGuessedLetters: (state, { payload }) => {
      console.log(payload);
      state.guessedLetters = payload;
    },
    resetGame: () => initialState,
  },
});

export const {
  setGuessedArray,
  setIsGameOver,
  setIsGameWon,
  setBoardColors,
  setGuessedLetters,
  resetGame,
} = gameSlice.actions;
export const selectGame = (state) => state.game;
export default gameSlice.reducer;
