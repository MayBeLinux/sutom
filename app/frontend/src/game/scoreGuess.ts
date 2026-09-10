import type { LetterFeedback } from "../api/game";

// Pure scoring: pour chaque lettre de la tentative, décide si elle est
// "correct" (bien placée), "present" (dans le mot mais mal placée) ou
// "absent". Gère les doublons comme Wordle/Sutom : chaque lettre du mot
// cible ne peut être "consommée" qu'une seule fois.
export function scoreGuess(guess: string, target: string): LetterFeedback[] {
  const g = guess.toUpperCase();
  const t = target.toUpperCase();
  const tiles: LetterFeedback[] = new Array(g.length);
  const remaining: (string | null)[] = t.split("");

  for (let i = 0; i < g.length; i++) {
    if (g[i] === remaining[i]) {
      tiles[i] = { letter: g[i], state: "correct" };
      remaining[i] = null;
    }
  }

  for (let i = 0; i < g.length; i++) {
    if (tiles[i] !== undefined) continue;
    const idx = remaining.indexOf(g[i]);
    if (idx !== -1) {
      tiles[i] = { letter: g[i], state: "present" };
      remaining[idx] = null;
    } else {
      tiles[i] = { letter: g[i], state: "absent" };
    }
  }

  return tiles;
}
