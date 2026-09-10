import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchWord,
  submitGuess,
  type TileState,
  type WordChallenge,
} from "../api/game";

const MAX_ROWS = 8;
const PLACEHOLDER_COLS = 8;

export type Tile = { letter: string; state: TileState };
export type GameStatus = "loading" | "playing" | "won" | "lost" | "error";
export type UseGameResult = {
  status: GameStatus;
  challenge: WordChallenge | null;
  board: Tile[][];
  currentRow: number;
  errorMessage: string | null;
  handleKey: (key: string) => void;
};

type StateSnapshot = {
  status: GameStatus;
  challenge: WordChallenge | null;
  board: Tile[][];
  currentRow: number;
  currentCol: number;
};

function buildEmptyBoard(rows: number, length: number, firstLetter: string): Tile[][] {
  const board: Tile[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < length; c++) {
      if (c === 0) {
        row.push({ letter: firstLetter, state: "correct" });
      } else {
        row.push({ letter: "", state: "empty" });
      }
    }
    board.push(row);
  }
  return board;
}

function buildPlaceholderBoard(): Tile[][] {
  return Array.from({ length: MAX_ROWS }, () =>
    Array.from(
      { length: PLACEHOLDER_COLS },
      () => ({ letter: "", state: "empty" as TileState }),
    ),
  );
}

/** React hook driving the Sutom-style game state machine. */
export function useGame(): UseGameResult {
  const [status, setStatus] = useState<GameStatus>("loading");
  const [challenge, setChallenge] = useState<WordChallenge | null>(null);
  const [board, setBoard] = useState<Tile[][]>(() => buildPlaceholderBoard());
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stateRef = useRef<StateSnapshot>({
    status: "loading",
    challenge: null,
    board: [],
    currentRow: 0,
    currentCol: 0,
  });

  const submittingRef = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    stateRef.current = {
      status,
      challenge,
      board,
      currentRow,
      currentCol,
    };
  }, [status, challenge, board, currentRow, currentCol]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchWord();
        if (!mountedRef.current) return;
        const initialBoard = buildEmptyBoard(MAX_ROWS, result.length, result.firstLetter);
        setChallenge(result);
        setBoard(initialBoard);
        setCurrentRow(0);
        setCurrentCol(1);
        setErrorMessage(null);
        setStatus("playing");
      } catch (err) {
        if (!mountedRef.current) return;
        setErrorMessage(err instanceof Error ? err.message : "Failed to load word");
        setStatus("error");
      }
    })();
  }, []);

  const submitCurrentRow = useCallback(async (guess: string, rowIndex: number) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      const result = await submitGuess(guess);
      if (!mountedRef.current) return;
      const snap = stateRef.current;
      const nextBoard = snap.board.map((row) => row.slice());
      nextBoard[rowIndex] = result.tiles.map((t) => ({ letter: t.letter, state: t.state }));
      setBoard(nextBoard);
      if (result.correct) {
        setStatus("won");
      } else if (rowIndex >= MAX_ROWS - 1) {
        setStatus("lost");
      } else {
        setCurrentRow(rowIndex + 1);
        setCurrentCol(1);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit guess");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      const snap = stateRef.current;
      if (snap.status !== "playing" || snap.challenge === null) return;

      const length = snap.challenge.length;
      const row = snap.currentRow;
      const col = snap.currentCol;

      if (key === "BACKSPACE") {
        if (col > 1) {
          const nextBoard = snap.board.map((r) => r.slice());
          nextBoard[row][col - 1] = { letter: "", state: "empty" };
          setBoard(nextBoard);
          setCurrentCol(col - 1);
        }
        return;
      }

      if (key === "ENTER") {
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        if (col >= length) return;
        const nextBoard = snap.board.map((r) => r.slice());
        nextBoard[row][col] = { letter: key, state: "empty" };
        setBoard(nextBoard);

        if (col === length - 1) {
          setCurrentCol(length);
          const guess = nextBoard[row].map((t) => t.letter).join("");
          void submitCurrentRow(guess, row);
        } else {
          setCurrentCol(col + 1);
        }
      }
    },
    [submitCurrentRow],
  );

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key;
      if (key === "Backspace") {
        handleKey("BACKSPACE");
        event.preventDefault();
        return;
      }
      if (key === "Enter") {
        handleKey("ENTER");
        event.preventDefault();
        return;
      }
      if (/^[a-zA-Z]$/.test(key)) {
        handleKey(key.toUpperCase());
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [handleKey]);

  return {
    status,
    challenge,
    board,
    currentRow,
    errorMessage,
    handleKey,
  };
}
