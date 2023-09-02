import React from 'react';
import { useSelector } from "react-redux";
import Backspace from "../../svgs/Backspace";
import { selectGame } from "../../reducers/gameSlice";
import "./style.scss";
import { TurkishAlphabet, GuessedLetterStatus } from '../../types';

type KeyboardProps = {
  activeGuess: string,
  setActiveGuess: React.Dispatch<React.SetStateAction<string>>
  handleButton: (event: any) => void
}

export default function Keyboard({ activeGuess, setActiveGuess, handleButton } : KeyboardProps) {
  const { guessedLetters, boardColors } = useSelector(selectGame);

  const firstRow = ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"];
  const thirdRow = ["Z", "C", "V", "B", "N", "M", "Ö", "Ç"];

  const generateStatus = (key: TurkishAlphabet): GuessedLetterStatus | "default" => {
    return guessedLetters[key] || "default";
  };

  return (
    <div className="keyboard_container">
      <div className="keyboard_row">
        {firstRow.map((key, index) => {
          return (
            <button
              data-btntype={"letter"}
              data-status={generateStatus(key as TurkishAlphabet)}
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
              data-btntype={"letter"}
              data-status={generateStatus(key as TurkishAlphabet)}
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
          data-btntype={"enter"}
          onClick={(e) => handleButton(e)}
          className="btn btn_enter"
        >
          Enter
        </button>
        {thirdRow.map((key, index) => {
          return (
            <button
              data-btntype={"letter"}
              data-status={generateStatus(key as TurkishAlphabet)}
              onClick={(e) => handleButton(e)}
              key={index}
              className="btn"
            >
              {key}
            </button>
          );
        })}
        <button
          data-btntype={"backspace"}
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
