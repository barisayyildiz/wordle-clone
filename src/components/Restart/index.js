import React from "react";
import "./style.scss";

import { useDispatch, useSelector } from "react-redux";
import { resetGame, setIsGameOver, selectGame } from "../../reducers/gameSlice";
import { resetWord, selectWord } from "../../reducers/wordSlice";

function Restart() {
  const { isGameOver } = useSelector(selectGame);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(resetGame());
    dispatch(resetWord());
    dispatch(setIsGameOver(false));
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.style.backgroundColor = "white";
      cell.style.color = "black";
    });
  };

  return (
    <div className={`restart-container ${isGameOver && "active"}`}>
      <button className="restart-button" onClick={clickHandler}>
        Reset
      </button>
    </div>
  );
}

export default Restart;
