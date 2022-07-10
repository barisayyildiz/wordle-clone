import { useState, useMemo, useEffect } from "react";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

// redux
import { useDispatch, useSelector } from "react-redux";
import { toggle, selectModalStatus } from "../../reducers/modalSlice";

import { selectWord } from "../../reducers/wordSlice";

import {
  setGuessedArray,
  setIsGameOver,
  setIsGameWon,
  setBoardColors,
  setGuessedLetters,
  selectGame,
} from "../../reducers/gameSlice";

import {
  incrementPlay,
  incrementWin,
  updateDistribution,
  setActive,
  selectStats,
} from "../../reducers/statsSlice";

import Board from "../Board";
import Keyboard from "../Keyboard";

import { checkWord, inWordList } from "../../lib/util";

export default function Game(props) {
  const [activeGuess, setActiveGuess] = useState("");

  // animation states
  const [failAnimation, setFailAnimation] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [insertAnimation, setInsertAnimation] = useState(false);

  // redux
  const dispatch = useDispatch();

  const { selectedWord: WORD } = useSelector(selectWord);
  const {
    guessedArray,
    boardColors,
    guessedLetters,
    isGameOver,
    isGameWon,
    numberOfGuesses,
    onNthGuess,
  } = useSelector(selectGame);

  const { played, win, curStreak, maxStreak, distribution, active } =
    useSelector(selectStats);

  const generateToast = (text, duration) => {
    return toast.dark(text, {
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
    let colors = [];
    for (let i = 0; i < guessedArray.length; i++) {
      colors.push(boardColors[i]);
    }
    colors.push(checkWord(activeGuess, WORD));
    dispatch(setBoardColors(colors));
  }, [activeGuess, WORD]);

  const adjustKeyboardStatus = () => {
    let tempObj = {};
    let colors = boardColors[boardColors.length - 1];

    for (let i = 0; i < colors.length; i++) {
      if (guessedLetters[activeGuess[i]] === undefined) {
        tempObj[activeGuess[i]] = colors[i];
      } else if (
        guessedLetters[activeGuess[i]] === "present" &&
        colors[i] === "correct"
      ) {
        tempObj[activeGuess[i]] = colors[i];
      }
    }
    dispatch(setGuessedLetters({ ...guessedLetters, ...tempObj }));
  };

  const handleEnterKey = (event) => {
    if (activeGuess.length !== 5) {
      setFailAnimation(true);
      generateToast("Yetersiz harf", 1000);
      return;
    }

    if (!inWordList(activeGuess)) {
      setFailAnimation(true);
      generateToast("Kelime listesinde yok", 1000);
      return;
    }

    if (activeGuess === WORD) {
      const number = distribution[guessedArray.length];
      dispatch(setIsGameOver(true));
      setSuccessAnimation(true);
      generateToast("Tebrikler", 2000);
      dispatch(incrementPlay());
      dispatch(incrementWin());
      dispatch(setActive(guessedArray.length + 1));
      dispatch(setIsGameWon(true));
      setTimeout(() => {
        dispatch(toggle());
      }, 3000);
    }

    // keyboard renkleri burada düzenlenecek
    adjustKeyboardStatus();

    setFinishedAnimation(true);

    dispatch(setGuessedArray([...guessedArray, activeGuess]));
    setActiveGuess("");

    if ([...guessedArray, activeGuess].length === 6) {
      dispatch(setIsGameOver(true));
      dispatch(setIsGameWon(false));
      generateToast(WORD, isGameOver);
    }

    return;
  };

  const handleLetterKey = (letter) => {
    const pattern = /[a-z]|[A-Z]|ü|ş|ç|ö|ı/;

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
      setInsertAnimation(true);
      setActiveGuess(
        (activeGuess) => activeGuess + letter.toLocaleUpperCase("TR")
      );
    }
  };

  const handleKey = (event) => {
    if (isGameOver) {
      return;
    }
    if (event.key === "Enter") {
      handleEnterKey(event);
      return;
    }
    handleLetterKey(event.key);
  };

  const handleButton = (event) => {
    if (isGameOver) {
      return;
    }

    let btntype = event.target.getAttribute("btntype");
    event.target.blur();

    if (btntype === "enter") {
      handleEnterKey(event);
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
        failAnimation={failAnimation}
        setFailAnimation={setFailAnimation}
        finishedAnimation={finishedAnimation}
        setFinishedAnimation={setFinishedAnimation}
        successAnimation={successAnimation}
        setSuccessAnimation={setSuccessAnimation}
        insertAnimation={insertAnimation}
        setInsertAnimation={setInsertAnimation}
        handleEnterKey={handleEnterKey}
        handleKey={handleKey}
      />
      <Keyboard
        activeGuess={activeGuess}
        setActiveGuess={setActiveGuess}
        handleEnterKey={handleEnterKey}
        handleKey={handleKey}
        handleButton={handleButton}
      />
    </div>
  );
}
