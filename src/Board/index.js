import { useEffect } from "react";
import Row from "../Row";

import './style.scss'

export default function Board(props) {
  const { guessedArray, activeGuess, handleKey } = props;

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeGuess]);

  return (
    <div className="board">
      {Array.from(Array(6).keys()).map((key) => {
        return (
          <Row
            finished={key < guessedArray.length ? true : false}
            active={guessedArray.length === key ? true : false}
            empty={key > guessedArray.length ? true : false}
            value={
              guessedArray.length === key
                ? activeGuess
                : key > guessedArray.length
                ? ""
                : guessedArray[key]
            }
            key={key}
            rowIndex={key}
            color={props.boardColors[key]}
            {...props}
          />
        );
      })}
    </div>
  );
}
