import { words } from "./constants";

export const inWordList = function (word) {
  const wordList = words.split("\n");
  return wordList.includes(word);
};

export const dayHasChanged = function () {
  const { day: yesterday } = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).time
  );
  const today = new Date().getDay();
  return today != yesterday;
};

export const selectAWord = function () {
  const wordsList = words.split("\n");
  console.log("wqeweq");
  return wordsList[Math.floor(Math.random() * wordsList.length)];
};

export const checkWord = function (guess, word) {
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
