import type { Tile } from "../../hooks/useGame";
import "./GameBoard.css";

type GameBoardProps = { board: Tile[][] };

export default function GameBoard({ board }: GameBoardProps) {
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
