import { useState } from "react";
import {
  StatsIcon,
  HelpIcon,
  SoundIcon,
  LanguageIcon,
  SettingsIcon,
} from "../icons/Icons";
import "./Header.css";

type HeaderProps = {
  onToggleStats: () => void;
  onToggleHelp: () => void;
};

export default function Header({ onToggleStats, onToggleHelp }: HeaderProps) {
  const [muted, setMuted] = useState(false);
  const [language, setLanguage] = useState<"FR" | "EN">("FR");
  const [settingsOpen, setSettingsOpen] = useState(false);

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

        <button
          type="button"
          className={`icon-button ${muted ? "icon-button--active" : ""}`}
          title={muted ? "Activer le son" : "Couper le son"}
          onClick={() => setMuted((value) => !value)}
        >
          <SoundIcon muted={muted} />
        </button>

        <button
          type="button"
          className="icon-button icon-button--label"
          title="Changer de langue"
          onClick={() => setLanguage((lang) => (lang === "FR" ? "EN" : "FR"))}
        >
          <LanguageIcon />
          <span>{language}</span>
        </button>

        <div className="settings-wrapper">
          <button
            type="button"
            className={`icon-button ${settingsOpen ? "icon-button--active" : ""}`}
            title="Paramètres"
            onClick={() => setSettingsOpen((open) => !open)}
          >
            <SettingsIcon />
          </button>

          {settingsOpen && (
            <div className="settings-panel">
              <p className="settings-panel__title">Paramètres</p>
              <label className="settings-panel__row">
                <span>Thème sombre</span>
                <input type="checkbox" defaultChecked disabled />
              </label>
              <label className="settings-panel__row">
                <span>Difficulté élevée</span>
                <input type="checkbox" disabled />
              </label>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
