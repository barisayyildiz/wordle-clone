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
  return wordsList[Math.floor(Math.random() * wordsList.length)];
};

export const checkWord = function (guess, word) {
  const green = [];
  let temp = "";
  const result = Array(5).fill(null);

  // letters on spot
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
    }
  }

  // trim word
  for (let i = 0; i < word.length; i++) {
    if (!result[i]) {
      temp += word[i];
    }
  }
  word = temp;

  // letters on diff indexes
  for (let i = 0; i < guess.length; i++) {
    if (!green.includes(i) && word.includes(guess[i])) {
      result[i] = "present";
      word = word.slice(0, i) + word.slice(i + 1);
    }
  }

  result.forEach((item, key) => {
    if (item == null) {
      result[key] = "absent";
    }
  });

  return result;
};
