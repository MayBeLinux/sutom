import "./StatsPanel.css";

export default function StatsPanel() {
  return (
    <div className="stats">
      <h2 className="stats-title">Statistiques</h2>

      <div className="stats-summary"></div>

      <div className="stats-distribution">
        <h3 className="stats-distribution__title">Répartition des essais</h3>
      </div>
    </div>
  );
}
