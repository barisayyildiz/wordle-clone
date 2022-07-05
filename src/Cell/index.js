import { useRef } from "react";

import './style.scss'

export default function Cell(props) {
  const { text } = props;

  const ref = useRef(null);

  let mappedColors = [];
  if (props.color !== undefined) {
    mappedColors = props.color.map((status) => {
      if (status === "correct") {
        return "#6AAA64";
      } else if (status === "present") {
        return "#C9B458";
      } else if (status === "absent") {
        return "#787c7e";
      }
    });
  }

  const generateClasses = () => {
    if (
      props.rowIndex === props.guessedArray.length - 1 &&
      props.finishedAnimation
    ) {
      // SORUN BURADA!!!
      //ref.current.style.animationDelay = `${props.cellIndex * 100}ms`;
      return "cell flipin";
    }

    if (
      props.rowIndex === props.guessedArray.length &&
      props.insertAnimation &&
      props.cellIndex === props.activeGuess.length - 1
    ) {
      return "cell popin";
    }

    if (props.rowIndex === props.guessedArray.length && props.failAnimation) {
      return "cell shake";
    }

    return "cell";
  };

  const handleAnimationEnd = (event) => {
    if (event.animationName === "FlipIn") {
      ref.current.style.backgroundColor = mappedColors[props.cellIndex];
      ref.current.style.color = "white";
      ref.current.classList.remove("flipin");
      ref.current.classList.add("flipout");
    }

    if (event.animationName === "PopIn") {
      props.setInsertAnimation(false);
    }

    if (event.animationName === "Shake") {
      props.setFailAnimation(false);
    }

    // DELAY EKLENECEK!!!
    if (event.animationName === "FlipOut" && props.isGameOver) {
      ref.current.classList.add("bounce");
      ref.current.style.animationDelay = `${props.cellIndex * 100}ms`;
    }
  };

  return (
    <div
      ref={ref}
      className={generateClasses()}
      onAnimationEnd={handleAnimationEnd}
    >
      {text}
    </div>
  );
}

