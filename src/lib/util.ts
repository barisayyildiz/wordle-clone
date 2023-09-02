import { words } from "./constants";
import type { BoardColorsType } from "../types";

export const inWordList = (word: string): boolean  => {
  const wordList = words.split("\n");
  return wordList.includes(word);
};

export const selectAWord = (): string => {
  const wordsList = words.split("\n");
  const rand = Math.floor(Math.random() * wordsList.length);
  return wordsList[rand];
};

export const checkWord = (guess: string, word: string): BoardColorsType => {
  const result = Array(5).fill(null);
  let temp = "";
  for (let i = 0; i < result.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (!result[i]) {
      temp += word[i];
    }
  }
  word = temp;

  for (let i = 0; i < guess.length; i++) {
    if (!result[i] && word.includes(guess[i])) {
      result[i] = "present";
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (!result[i]) {
      result[i] = "absent";
    }
  }
  return result;
};
