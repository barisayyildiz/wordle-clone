import { useRef, useEffect } from "react";

import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import {
  setGuessedArray,
  setIsGameOver,
  setBoardColors,
  setGuessedLetters,
  selectGame,
} from "../../reducers/gameSlice";

export default function Cell(props) {
  const { text, activeGuess } = props;

  const ref = useRef(null);

  const { boardColors, guessedArray, isGameOver, isGameWon } =
    useSelector(selectGame);

  let mappedColors = [];
  if (boardColors[props.rowIndex] !== undefined) {
    mappedColors = boardColors[props.rowIndex].map((status) => {
      if (status === "correct") {
        return "#6AAA64";
      } else if (status === "present") {
        return "#C9B458";
      } else if (status === "absent") {
        return "#787c7e";
      }
    });
  }

  useEffect(() => {
    if (props.rowIndex < guessedArray.length) {
      ref.current.style.backgroundColor = mappedColors[props.cellIndex];
      ref.current.style.color = "white";
    }
  }, []);

  const generateClasses = () => {
    if (props.rowIndex === guessedArray.length - 1 && props.finishedAnimation) {
      // SORUN BURADA!!!
      //ref.current.style.animationDelay = `${props.cellIndex * 100}ms`;
      return "cell flipin";
    }

    if (
      props.rowIndex === guessedArray.length &&
      props.insertAnimation &&
      props.cellIndex === props.activeGuess.length - 1
    ) {
      return "cell popin";
    }

    if (props.rowIndex === guessedArray.length && props.failAnimation) {
      return "cell shake";
    }

    return "cell";
  };

  const handleAnimationEnd = (event) => {
    if (event.animationName === "FlipIn") {
      ref.current.style.backgroundColor = mappedColors[props.cellIndex];
      ref.current.style.color = "white";
      ref.current.classList.remove("flipin");
      ref.current.classList.add("flipout");
    }

    if (event.animationName === "PopIn") {
      props.setInsertAnimation(false);
      // ref.current.style.border = '5px solid black'
    }

    if (event.animationName === "Shake") {
      props.setFailAnimation(false);
    }

    // DELAY EKLENECEK!!!
    if (event.animationName === "FlipOut" && isGameWon) {
      ref.current.classList.add("bounce");
      ref.current.style.animationDelay = `${props.cellIndex * 100}ms`;
    }
  };

  return (
    <div
      ref={ref}
      className={generateClasses()}
      onAnimationEnd={handleAnimationEnd}
      style={{
        border:
          props.active &&
          activeGuess.length > props.cellIndex &&
          `2px solid #787c7e`,
      }}
    >
      {text}
    </div>
  );
}
