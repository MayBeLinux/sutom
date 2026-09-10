export type TileState = "correct" | "present" | "absent" | "empty";

// Ce que le back renvoie via GET /api/games/day-word, remis à plat pour le hook.
// Le back expose actuellement le mot complet ; on l'utilise côté front pour scorer
// chaque tentative sans aller-retour supplémentaire.
export type WordChallenge = {
  word: string;
  length: number;
  firstLetter: string;
};

// Résultat par lettre après validation d'une tentative.
export type LetterFeedback = {
  letter: string;
  state: Exclude<TileState, "empty">;
};

// Résultat complet d'une tentative.
export type GuessResult = {
  tiles: LetterFeedback[];
  correct: boolean;
};

type DayWordResponse = {
  latestWord: {
    word: string;
    letterCount: number;
    firstLetter: string;
  };
};

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "";

// GET {API_BASE_URL}/api/games/day-word
export async function fetchWord(): Promise<WordChallenge> {
  const response = await fetch(`${API_BASE_URL}/api/games/day-word`);
  if (!response.ok) {
    throw new Error(`fetchWord failed: ${response.status}`);
  }
  const payload = (await response.json()) as DayWordResponse;
  return {
    word: payload.latestWord.word.toUpperCase(),
    length: payload.latestWord.letterCount,
    firstLetter: payload.latestWord.firstLetter.toUpperCase(),
  };
}
