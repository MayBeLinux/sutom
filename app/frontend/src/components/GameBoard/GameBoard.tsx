import "./GameBoard.css";

type TileState = "correct" | "present" | "absent" | "empty";

type Tile = {
  letter: string;
  state: TileState;
};

const ROWS = 8;
const COLS = 8;
const REVEALED_FIRST_LETTER = "M";

const sampleGuesses: Tile[][] = [
  [
    { letter: "M", state: "correct" },
    { letter: "O", state: "absent" },
    { letter: "T", state: "present" },
    { letter: "U", state: "absent" },
    { letter: "S", state: "correct" },
    { letter: "T", state: "absent" },
    { letter: "A", state: "present" },
    { letter: "R", state: "absent" },
  ],
  [
    { letter: "M", state: "correct" },
    { letter: "A", state: "present" },
    { letter: "I", state: "absent" },
    { letter: "S", state: "correct" },
    { letter: "O", state: "absent" },
    { letter: "N", state: "correct" },
  ],
];

function buildBoard(): Tile[][] {
  return Array.from({ length: ROWS }, (_, rowIndex) => {
    const guess = sampleGuesses[rowIndex] ?? [];
    return Array.from({ length: COLS }, (_, colIndex) => {
      if (guess[colIndex]) {
        return guess[colIndex];
      }
      if (colIndex === 0) {
        return { letter: REVEALED_FIRST_LETTER, state: "correct" as TileState };
      }
      return { letter: "", state: "empty" as TileState };
    });
  });
}

export default function GameBoard() {
  const board = buildBoard();

  return (
    <div className="board">
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((tile, colIndex) => (
              <div
                key={colIndex}
                className={`board-tile board-tile--${tile.state}`}
              >
                {tile.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="board-caption">
        Rouge : lettre bien placée &middot; Jaune : lettre présente mais mal
        placée &middot; Bleu : lettre absente du mot.
      </p>
    </div>
  );
}
