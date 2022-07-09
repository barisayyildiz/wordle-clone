import { useState, useMemo } from "react";
import { ToastContainer, Flip, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './style.scss'

// redux
import { useDispatch, useSelector } from "react-redux"
import {
  toggle,
  selectModalStatus
} from "../reducers/modalSlice"

import Board from "../Board";
import Keyboard from "../Keyboard";
import { checkWord } from "../lib/util";

export default function Game(props) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedArray, setGuessedArray] = useState([]);
  const [activeGuess, setActiveGuess] = useState("");

  // colors
  const [boardColors, setBoardColors] = useState([]);

  // for keyboard
  const [guessedLetters, setGuessedLetters] = useState({});

  // animation states
  const [failAnimation, setFailAnimation] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [insertAnimation, setInsertAnimation] = useState(false);

  // redux
  const { visible } = useSelector(selectModalStatus);

  const WORD = "KOLAY";

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
			transition: Flip
			});
	}

  useMemo(() => {
    let colors = [];
    for (let i = 0; i < guessedArray.length; i++) {
      colors.push(boardColors[i]);
    }
    colors.push(checkWord(activeGuess, WORD));
    setBoardColors(colors);
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
    setGuessedLetters({ ...guessedLetters, ...tempObj });
  };

  const handleEnterKey = (event) => {
    if (activeGuess.length !== 5) {
      setFailAnimation(true);
			generateToast('Yetersiz harf', 1000)
      return;
    }

    if (activeGuess === WORD) {
      setIsGameOver(true);
      setSuccessAnimation(true);
			generateToast('Tebrikler', 2000)
			setTimeout(() => {
				// useDispatch(toggle())
        props.setModalStatus(true)
			},3000)
    }

    // keyboard renkleri burada düzenlenecek
    adjustKeyboardStatus();

    setFinishedAnimation(true);

    setGuessedArray([...guessedArray, activeGuess]);
    setActiveGuess("");

		if([...guessedArray, activeGuess].length === 6){
			generateToast(WORD, false)
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
      setActiveGuess((activeGuess) => activeGuess + letter.toUpperCase());
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleEnterKey(event);
      return;
    }
    handleLetterKey(event.key);
  };

  const handleButton = (event) => {
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
					margin:'100px 0px',
					fontSize: '120%',
					width: '200px'
				}}
			/>

      <Board
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        guessedArray={guessedArray}
        setGuessedArray={setGuessedArray}
        activeGuess={activeGuess}
        setActiveGuess={setActiveGuess}
        WORD={WORD}
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
        boardColors={boardColors}
        setBoardColors={setBoardColors}
      />
      <Keyboard
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        guessedArray={guessedArray}
        activeGuess={activeGuess}
        setActiveGuess={setActiveGuess}
        handleEnterKey={handleEnterKey}
        handleKey={handleKey}
        handleButton={handleButton}
      />
    </div>
  );
}
