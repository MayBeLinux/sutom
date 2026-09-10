import { StatsIcon, HelpIcon } from "../icons/Icons";
import "./Header.css";

type HeaderProps = {
  onToggleStats: () => void;
  onToggleHelp: () => void;
};

export default function Header({ onToggleStats, onToggleHelp }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-title">
        <h1>SUTOM</h1>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button"
          title="Statistiques"
          onClick={onToggleStats}
        >
          <StatsIcon />
        </button>

        <button
          type="button"
          className="icon-button"
          title="Aide"
          onClick={onToggleHelp}
        >
          <HelpIcon />
        </button>
      </div>
    </header>
  );
}
