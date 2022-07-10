import React from "react";
import "./style.scss";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { resetGame, setIsGameOver, selectGame } from "../../reducers/gameSlice";
import { resetWord, selectWord } from "../../reducers/wordSlice";

function Restart() {
  const { isGameOver } = useSelector(selectGame);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    e.target.blur();

    dispatch(resetGame());
    dispatch(resetWord());
    toast.dismiss();
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
