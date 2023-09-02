import React from "react";
import "./style.scss";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { resetGame, selectGame } from "../../reducers/gameSlice";
import { resetWord } from "../../reducers/wordSlice";

function Restart() {
  const { isGameOver } = useSelector(selectGame);
  const dispatch = useDispatch();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(resetGame());
    dispatch(resetWord());
    toast.dismiss();
    document.querySelectorAll(".cell").forEach((cell) => {
      const element = cell as HTMLElement; // Explicitly cast to HTMLElement
      element.style.backgroundColor = "white";
      element.style.color = "black";
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
