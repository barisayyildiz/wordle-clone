import React from "react";
import Cell from "../Cell";
import type { BoardProps } from "../Board";
import { TurkishAlphabet } from "../../types";

export type RowProps = {
  finished: boolean
  active: boolean
  empty: boolean
  value: string
  rowIndex: number
} & BoardProps;

export default function Row(props: RowProps) {

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
            text={props.value[key] ? props.value[key] as TurkishAlphabet : ""}
            {...props}
          />
        );
      })}
    </div>
  );
}
