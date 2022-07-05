import Cell from "../Cell";

export default function Row(props) {
  const { value } = props;

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
            //color={props.color != undefined ? props.color[key] : "white"}
            color={props.color}
            {...props}
          />
        );
      })}
    </div>
  );
}
