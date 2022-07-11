import { useEffect } from "react";
import Row from "../Row";

import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../../reducers/gameSlice";

export default function Board(props) {
  const { activeGuess, handleKey } = props;

  const { guessedArray, isGameOver } = useSelector(selectGame);

  const { boardColors } = useSelector(selectGame);

  const gameStates = useSelector(selectGame);

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
