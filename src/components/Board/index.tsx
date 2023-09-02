import React from 'react';
import { useEffect, Dispatch, SetStateAction } from "react";
import Row from "../Row";
import { useSelector } from "react-redux";
import { selectGame} from "../../reducers/gameSlice";
import "./style.scss";

export type BoardProps = {
  activeGuess: string,
  setActiveGuess: Dispatch<SetStateAction<string>>,
  handleKey: (this: Document, ev: KeyboardEvent) => void
}
 
export default function Board(props: BoardProps) {
  const { activeGuess, handleKey } = props;
  const { guessedArray, isGameOver } = useSelector(selectGame);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isGameOver, activeGuess]);

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
            {...props}
          />
        );
      })}
    </div>
  );
}
