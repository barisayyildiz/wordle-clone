import { useRef, useEffect } from "react";

import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../../reducers/gameSlice";

export default function Cell(props) {
  const { text, activeGuess, finished } = props;

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
    if (finished) {
      ref.current.style.backgroundColor = mappedColors[props.cellIndex];
      ref.current.style.color = "white";
    }
  }, []);

  const generateClasses = () => {
    if (props.rowIndex === guessedArray.length - 1 && props.finishedAnimation) {
      // SORUN BURADA!!!
      ref.current.style.animationDelay = `${props.cellIndex * 300}ms`;
      return "cell flipin";
    }

    if (
      props.rowIndex === guessedArray.length &&
      props.insertAnimation &&
      props.cellIndex === props.activeGuess.length - 1
    ) {
      ref.current.style.animationDelay = "0ms";
      return "cell popin";
    }

    if (props.rowIndex === guessedArray.length && props.failAnimation) {
      ref.current.style.animationDelay = "0ms";
      return "cell shake";
    }

    // // eğer oyun kazanıldıysa
    // console.log(props.rowIndex + 1, guessedArray.length, props.rowIndex + 1 === guessedArray.length);
    // if (isGameWon && props.rowIndex + 1 === guessedArray.length) {
    //   console.log(`---> ${props.rowIndex}, ${guessedArray.length}`);
    //   console.log("kazanıldı...")
    //   if(ref.current){
    //     ref.current.style.animationDelay = `${props.cellIndex * 100}ms`;
    //   }
    //   return "cell bounce";
    // }

    return "cell";
  };

  const handleAnimationEnd = (event) => {
    if (event.animationName === "FlipIn") {
      ref.current.style.backgroundColor = mappedColors[props.cellIndex];
      ref.current.style.color = "white";
      ref.current.classList.remove("flipin");
      ref.current.classList.add("flipout");
      ref.current.style.animationDelay = `0ms`;
    }

    if (event.animationName === "PopIn") {
      props.setInsertAnimation(false);
      ref.current.style.animationDelay = "0ms";
    }

    if (event.animationName === "Shake") {
      props.setFailAnimation(false);
    }

    // DELAY EKLENECEK!!!
    if (event.animationName === "FlipOut" && isGameWon) {
      ref.current.classList.add("bounce");
      ref.current.style.animationDelay = `${(4-props.cellIndex) * 300 + 100*props.cellIndex}ms`;
    }

    if (event.animationName === "Bounce") {
      ref.current.style.animationDelay = "0ms";
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
