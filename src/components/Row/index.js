import Cell from "../Cell";

import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../../reducers/gameSlice";

export default function Row(props) {
  const { value, activeGuess } = props;

  const { boardColors } = useSelector(selectGame);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={style} className="row">
      {Array.from(Array(5).keys()).map((key) => {
        return (
          <Cell
            key={key}
            cellIndex={key}
            rowIndex={props.rowIndex}
            text={value[key] ? value[key] : ""}
            {...props}
          />
        );
      })}
    </div>
  );
}
