import "./StatsPanel.css";

const summary = [
  { label: "Parties jouées", value: 42 },
  { label: "% de victoires", value: "78%" },
  { label: "Série actuelle", value: 5 },
  { label: "Meilleure série", value: 11 },
];

const distribution = [
  { attempt: 1, count: 1 },
  { attempt: 2, count: 4 },
  { attempt: 3, count: 9 },
  { attempt: 4, count: 12 },
  { attempt: 5, count: 7 },
  { attempt: 6, count: 4 },
  { attempt: 7, count: 2 },
  { attempt: 8, count: 1 },
];

const maxCount = Math.max(...distribution.map((row) => row.count));

export default function StatsPanel() {
  return (
    <div className="stats">
      <h2 className="stats-title">Statistiques</h2>

      <div className="stats-summary">
        {summary.map((item) => (
          <div className="stats-summary__item" key={item.label}>
            <span className="stats-summary__value">{item.value}</span>
            <span className="stats-summary__label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="stats-distribution">
        <h3 className="stats-distribution__title">Répartition des essais</h3>
        {distribution.map((row) => (
          <div className="stats-distribution__row" key={row.attempt}>
            <span className="stats-distribution__attempt">{row.attempt}</span>
            <div className="stats-distribution__track">
              <div
                className="stats-distribution__bar"
                style={{ width: `${(row.count / maxCount) * 100}%` }}
              >
                <span>{row.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
