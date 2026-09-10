export type TileState = "correct" | "present" | "absent" | "empty";

// Info renvoyée par le back au démarrage : longueur du mot à trouver + première lettre révélée.
export type WordChallenge = {
  length: number;
  firstLetter: string;
};

// Résultat par lettre après validation d'une tentative (le back ne renvoie jamais "empty" ici).
export type LetterFeedback = {
  letter: string;
  state: Exclude<TileState, "empty">;
};

// Résultat complet d'une tentative.
export type GuessResult = {
  tiles: LetterFeedback[];
  correct: boolean;
};

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "";

// GET {API_BASE_URL}/api/word
export async function fetchWord(): Promise<WordChallenge> {
  const response = await fetch(`${API_BASE_URL}/api/word`);
  if (!response.ok) {
    throw new Error(`fetchWord failed: ${response.status}`);
  }
  return response.json() as Promise<WordChallenge>;
}

// POST {API_BASE_URL}/api/word/guess  body: { guess: string }
export async function submitGuess(guess: string): Promise<GuessResult> {
  const response = await fetch(`${API_BASE_URL}/api/word/guess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guess }),
  });
  if (!response.ok) {
    throw new Error(`submitGuess failed: ${response.status}`);
  }
  return response.json() as Promise<GuessResult>;
}
