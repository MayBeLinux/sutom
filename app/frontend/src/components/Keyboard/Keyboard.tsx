import { BackspaceIcon } from "../icons/Icons";
import "./Keyboard.css";

const ROWS = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"],
];

type KeyboardProps = { onKeyPress: (key: string) => void };

export default function Keyboard({ onKeyPress }: KeyboardProps) {
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
                tabIndex={-1}
                className={`keyboard-key ${isWide ? "keyboard-key--wide" : ""}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onKeyPress(key)}
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
