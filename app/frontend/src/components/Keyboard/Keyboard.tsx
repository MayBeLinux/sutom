import { useState } from "react";
import { BackspaceIcon } from "../icons/Icons";
import "./Keyboard.css";

const ROWS = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"],
];

export default function Keyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);

  function handlePress(key: string) {
    setActiveKey(key);
    setLastKey(key);
    window.setTimeout(() => {
      setActiveKey((current) => (current === key ? null : current));
    }, 150);
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "BACKSPACE";
            return (
              <button
                key={key}
                type="button"
                className={`keyboard-key ${isWide ? "keyboard-key--wide" : ""} ${
                  activeKey === key ? "keyboard-key--pressed" : ""
                }`}
                onClick={() => handlePress(key)}
              >
                {key === "BACKSPACE" ? (
                  <BackspaceIcon />
                ) : key === "ENTER" ? (
                  "Entrée"
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}

      <p className="keyboard-caption">
        Dernière touche détectée :{" "}
        <strong>{lastKey ? lastKey : "aucune"}</strong>
      </p>
    </div>
  );
}
