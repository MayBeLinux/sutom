import "./GameBoard.css";

type TileState = "correct" | "present" | "absent" | "empty";

type Tile = {
  letter: string;
  state: TileState;
};

const ROWS = 8;
const COLS = 8;

export default function GameBoard() {
  const board: Tile[][] = Array.from({ length: ROWS }, () =>
    Array.from(
      { length: COLS },
      () => ({ letter: "", state: "empty" as TileState }),
    ),
  );

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
    </div>
  );
}
