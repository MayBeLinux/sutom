import { BackspaceIcon } from "../icons/Icons";
import "./Keyboard.css";

const ROWS = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"],
];

export default function Keyboard() {
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
                className={`keyboard-key ${isWide ? "keyboard-key--wide" : ""}`}
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
    </div>
  );
}
