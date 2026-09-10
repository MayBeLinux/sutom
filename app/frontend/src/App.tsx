import { useState } from "react";
import Header from "./components/Header/Header";
import GameBoard from "./components/GameBoard/GameBoard";
import Keyboard from "./components/Keyboard/Keyboard";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import HelpModal from "./components/HelpModal/HelpModal";
import "./App.css";

function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div className="app">
      <Header
        onToggleHelp={() => setHelpOpen((open) => !open)}
        onToggleStats={() => setStatsOpen((open) => !open)}
      />

      <main className="app-main">
        <section className="panel panel--game">
          <GameBoard />
        </section>

        <section className="panel panel--keyboard">
          <Keyboard />
        </section>

        {statsOpen && (
          <section className="panel panel--stats">
            <StatsPanel />
          </section>
        )}
      </main>

      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

export default App;
