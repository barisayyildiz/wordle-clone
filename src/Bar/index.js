import "./style.scss";

export default function Bar(props) {
  const { distribution, active } = props;

  const biggest = Math.max(...distribution);

  const generateWidth = (n) => {
    return {
      textAlign: n === 0 ? "center" : "right",
      width: `${(n / biggest) * 100}%`
    };
  };

  return (
    <div id="guess-distribution">
      <div className="guess-distribution-header">Tahmin Dağılımı</div>
      <div className="guess-distribution-content">
        {[1, 2, 3, 4, 5, 6].map((key) => {
          return (
            <div className="guess-distribution-content-row">
              <div>{key}</div>
              <div
                style={generateWidth(distribution[key - 1])}
                className={`guess-bar ${active === key && 'active'}`}
              >
                {distribution[key - 1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
