import React, { useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectGame } from "../../reducers/gameSlice";
import "./style.scss";
import { useDispatch } from "react-redux";
import { selectAnimation } from '../../reducers/animationSlice';
import { setFailAnimation, setInsertAnimation, } from "../../reducers/animationSlice";

import { BoardColorsType, GuessedLetterStatus, TurkishAlphabet } from "../../types";
import type { RowProps } from "../Row";

type CellProps = {
  text: TurkishAlphabet | ''
  cellIndex: number
} & RowProps

export default function Cell(props: CellProps) {
  const { text, activeGuess, finished, cellIndex, rowIndex } = props;

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const { failAnimation, finishedAnimation, 
          successAnimation, insertAnimation } = useSelector(selectAnimation);

  const { boardColors, guessedArray, isGameOver, isGameWon } =
    useSelector(selectGame);

  let mappedColors = useMemo(() => {
    if (boardColors[rowIndex] !== undefined) {
      return boardColors[rowIndex].map((status: GuessedLetterStatus) => {
        if (status === "correct") {
          return "#6AAA64";
        } else if (status === "present") {
          return "#C9B458";
        } else if (status === "absent") {
          return "#787c7e";
        }
      });
    }
    return []
  }, [boardColors])

  useEffect(() => {
    if (finished) {
      ref.current!.style.backgroundColor = mappedColors[cellIndex] as string;
      ref.current!.style.color = "white";
    }
  }, []);

  const generateClasses = () => {
    if (rowIndex === guessedArray.length - 1 && finishedAnimation) {
      // SORUN BURADA!!!
      ref.current!.style.animationDelay = `${cellIndex * 300}ms`;
      return "cell flipin";
    }

    if (
      rowIndex === guessedArray.length &&
      insertAnimation &&
      cellIndex === props.activeGuess.length - 1
    ) {
      ref.current!.style.animationDelay = "0ms";
      return "cell popin";
    }

    if (rowIndex === guessedArray.length && failAnimation) {
      ref.current!.style.animationDelay = "0ms";
      return "cell shake";
    }

    // // eğer oyun kazanıldıysa
    // console.log(rowIndex + 1, guessedArray.length, rowIndex + 1 === guessedArray.length);
    // if (isGameWon && rowIndex + 1 === guessedArray.length) {
    //   console.log(`---> ${rowIndex}, ${guessedArray.length}`);
    //   console.log("kazanıldı...")
    //   if(ref.current){
    //     ref.current.style.animationDelay = `${cellIndex * 100}ms`;
    //   }
    //   return "cell bounce";
    // }

    return "cell";
  };

  const handleAnimationEnd = (event: React.AnimationEvent) => {
    if (event.animationName === "FlipIn") {
      ref.current!.style.backgroundColor = mappedColors[cellIndex] as string;
      ref.current!.style.color = "white";
      ref.current!.classList.remove("flipin");
      ref.current!.classList.add("flipout");
      ref.current!.style.animationDelay = `0ms`;
    }

    if (event.animationName === "PopIn") {
      dispatch(setInsertAnimation(false));
      ref.current!.style.animationDelay = "0ms";
    }

    if (event.animationName === "Shake") {
      dispatch(setFailAnimation(false));
    }

    // DELAY EKLENECEK!!!
    if (event.animationName === "FlipOut" && isGameWon) {
      ref.current!.classList.add("bounce");
      ref.current!.style.animationDelay = `${(4-cellIndex) * 300 + 100*cellIndex}ms`;
    }

    if (event.animationName === "Bounce") {
      ref.current!.style.animationDelay = "0ms";
    }
  };

  return (
    <div
      ref={ref}
      className={generateClasses()}
      onAnimationEnd={handleAnimationEnd}
      style={{
        ...(props.active && activeGuess.length > cellIndex ? 
          { border: `2px solid #787c7e` } : 
          {}
        )
      }}
    >
      {text}
    </div>
  );
}
