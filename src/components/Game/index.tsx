import React from 'react';
import { useState, useMemo, useEffect } from "react";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../reducers/modalSlice";
import { selectWord } from "../../reducers/wordSlice";
import type { TurkishAlphabet } from '../../types';

import {
  setGuessedArray,
  setIsGameOver,
  setIsGameWon,
  setBoardColors,
  setGuessedLetters,
  selectGame,
} from "../../reducers/gameSlice";

import {
  setFailAnimation,
  setFinishedAnimation,
  setSuccessAnimation,
  setInsertAnimation,
} from "../../reducers/animationSlice";

import {
  handleWin,
  setActive,
  selectStats,
  handleFail,
} from "../../reducers/statsSlice";

import Board from "../Board";
import Keyboard from "../Keyboard";

import { checkWord, inWordList } from "../../lib/util";
import { BoardColorsType } from '../../types';

export default function Game() {
  const [activeGuess, setActiveGuess] = useState("");

  const dispatch = useDispatch();

  const { selectedWord: WORD } = useSelector(selectWord);
  const {
    guessedArray,
    boardColors,
    guessedLetters,
    isGameOver,
    isGameWon,
  } = useSelector(selectGame);

  const generateToast = (word: string, duration: number | false) => {
    return toast.dark(word, {
      position: "top-center",
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      transition: Flip,
    });
  };

  useEffect(() => {
    if (isGameOver && !isGameWon) {
      generateToast(WORD, false);
    }
  }, []);

  useMemo(() => {
    let colors: BoardColorsType[] = [];
    for (let i = 0; i < guessedArray.length; i++) {
      colors.push(boardColors[i]);
    }
    colors.push(checkWord(activeGuess, WORD));
    dispatch(setBoardColors(colors));
  }, [activeGuess, WORD]);

  const adjustKeyboardStatus = () => {
    let tempObj: any = {};
    let colors = boardColors[boardColors.length - 1];

    for (let i = 0; i < colors.length; i++) {
      let letter = activeGuess[i] as TurkishAlphabet;
      if (guessedLetters[letter] === undefined) {
        tempObj[letter] = colors[i];
      } else if (
        guessedLetters[letter] === "present" &&
        colors[i] === "correct"
      ) {
        tempObj[letter] = colors[i];
      } else if (
        guessedLetters[letter] === "absent" &&
        (colors[i] === "correct" || colors[i] === "present")
      ) {
        tempObj[letter] = colors[i];
      }
    }

    dispatch(setGuessedLetters({ ...guessedLetters, ...tempObj }));
  };

  const handleEnterKey = () => {
    if (activeGuess.length !== 5) {
      dispatch(setFailAnimation(true));
      generateToast("Yetersiz harf", 1000);
      return;
    }

    if (!inWordList(activeGuess)) {
      dispatch(setFailAnimation(true));
      generateToast("Kelime listesinde yok", 1000);
      return;
    }

    if (activeGuess === WORD) {
      dispatch(setIsGameOver(true));
      dispatch(setSuccessAnimation(true));
      generateToast("Tebrikler", 2000);
      dispatch(handleWin());
      dispatch(setActive(guessedArray.length + 1));
      dispatch(setIsGameWon(true));
      setTimeout(() => {
        dispatch(toggle());
      }, 3000);
    }

    // keyboard renkleri burada düzenlenecek
    adjustKeyboardStatus();

    dispatch(setFinishedAnimation(true));

    dispatch(setGuessedArray([...guessedArray, activeGuess]));
    setActiveGuess("");

    if ([...guessedArray, activeGuess].length === 6) {
      dispatch(setIsGameOver(true));
      dispatch(handleFail());
      generateToast(WORD, isGameOver as false);
      setTimeout(() => {
        dispatch(toggle());
      }, 3000);
    }

    return;
  };

  const handleLetterKey = (letter: string) => {
    const pattern = /[a-z]|[A-Z]|ü|ş|ç|ö|ı|ğ|Ü|Ş|Ç|Ö|İ|Ğ/;

    // backspace
    if (letter === "Backspace") {
      setActiveGuess((activeGuess) =>
        activeGuess.slice(0, activeGuess.length - 1)
      );
      return;
    }

    // if the activeGuess is already at length 5
    if (activeGuess.length === 5) {
      return;
    }

    // if the pattern mathces
    if (pattern.test(letter) && letter.length === 1) {
      dispatch(setInsertAnimation(true));
      setActiveGuess(
        (activeGuess) => activeGuess + letter.toLocaleUpperCase("TR")
      );
    }
  };

  const handleKey = (event: KeyboardEvent) => {
    if (isGameOver) {
      return;
    }
    if (event.key === "Enter") {
      handleEnterKey();
      return;
    }
    handleLetterKey(event.key);
  };

  const handleButton = (event: any) => {
    if (isGameOver) {
      return;
    }

    let btntype = event.target.getAttribute("data-btntype");
    event.target.blur();

    if (btntype === "enter") {
      handleEnterKey();
    } else if (btntype === "backspace") {
      handleLetterKey("Backspace");
    } else if (btntype === "letter") {
      handleLetterKey(event.target.innerText);
    }
  };

  return (
    <div className="game">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          margin: "30px 0px",
          width: "auto",
        }}
      />
      <Board
        activeGuess={activeGuess}
        setActiveGuess={setActiveGuess}
        handleKey={handleKey}
      />
      <Keyboard
        activeGuess={activeGuess}
        setActiveGuess={setActiveGuess}
        handleButton={handleButton}
      />
    </div>
  );
}
