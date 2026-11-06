import type { Base } from './digit-validator.js';
import { generateSecret, type Random } from './generate-secret.js';
import { evaluateGuess, type GuessResult } from './guess.js';

export type GuessEntry = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameStatus = 'playing' | 'won';

export type GameState = {
  secret: string;
  base: Base;
  status: GameStatus;
  history: GuessEntry[];
};

export const startGame = (
  length: number,
  base: Base,
  random: Random = Math.random,
): GameState => ({
  secret: generateSecret(length, base, random),
  base,
  status: 'playing',
  history: [],
});

export const isWin = (result: GuessResult, length: number): boolean => {
  return result.bulls === length;
};

export const submitGuess = (state: GameState, guess: string): GameState => {
  if (state.status === 'won') return state;

  const normalizedGuess = guess.toLowerCase();

  const isRepeat = state.history.some(
    (entry) => entry.guess === normalizedGuess,
  );

  if (isRepeat) return state;

  const result = evaluateGuess(state.secret, normalizedGuess);
  const entry: GuessEntry = { guess: normalizedGuess, ...result };

  const won = isWin(result, state.secret.length);

  return {
    ...state,
    history: [...state.history, entry],
    status: won ? 'won' : 'playing',
  };
};
