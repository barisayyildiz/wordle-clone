import Backspace from "../../svgs/Backspace";
import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../../reducers/gameSlice";

export default function Keyboard(props) {
  // const { guessedLetters, setActiveGuess, handleButton } = props;
  const { setActiveGuess, handleButton } = props;

  const { guessedLetters, boardColors } = useSelector(selectGame);

  const firstRow = ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"];
  const thirdRow = ["Z", "C", "V", "B", "N", "M", "Ö", "Ç"];

  const generateStatus = (key) => {
    return guessedLetters[key] !== undefined ? guessedLetters[key] : "default";
  };

  return (
    <div className="keyboard_container">
      <div className="keyboard_row">
        {firstRow.map((key, index) => {
          return (
            <button
              btntype={"letter"}
              status={generateStatus(key)}
              onClick={(e) => handleButton(e)}
              key={index}
              className="btn"
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboard_row">
        {secondRow.map((key, index) => {
          return (
            <button
              btntype={"letter"}
              status={generateStatus(key)}
              onClick={(e) => handleButton(e)}
              key={index}
              className="btn"
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboard_row">
        <button
          btntype={"enter"}
          onClick={(e) => handleButton(e)}
          className="btn btn_enter"
        >
          Enter
        </button>
        {thirdRow.map((key, index) => {
          return (
            <button
              btntype={"letter"}
              status={generateStatus(key)}
              onClick={(e) => handleButton(e)}
              key={index}
              className="btn"
            >
              {key}
            </button>
          );
        })}
        <button
          btntype={"backspace"}
          onClick={() =>
            setActiveGuess((activeGuess) =>
              activeGuess.slice(0, activeGuess.length - 1)
            )
          }
          className="btn btn_back"
        >
          <Backspace />
        </button>
      </div>
    </div>
  );
}
