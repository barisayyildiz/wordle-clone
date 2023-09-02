import { createSlice } from "@reduxjs/toolkit";
import type { BoardColorsType, GuessedLetters } from "../types";
import type { RootState } from ".";

type GameSliceState = {
  isGameOver: boolean,
  isGameWon: boolean,
  guessedArray: Array<string>,
  numberOfGuesses: number,
  onNthGuess: number | null,
  boardColors: BoardColorsType[],
  guessedLetters: GuessedLetters
}

const initialState: GameSliceState = {
  isGameOver: false,
  isGameWon: false,
  guessedArray: [],
  numberOfGuesses: 0,
  onNthGuess: null,
  boardColors: [],
  guessedLetters: {},
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
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
      state.boardColors = payload;
    },
    setGuessedLetters: (state, { payload }) => {
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
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
