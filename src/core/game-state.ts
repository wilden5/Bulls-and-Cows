import type { Base } from './digit-validator.js';
import type { Random } from './generate-secret.js';
import type { GuessResult } from './guess.js';

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
  _length: number,
  _base: Base,
  _random: Random = Math.random,
): GameState => {
  throw new Error('not implemented');
};

export const isWin = (_result: GuessResult, _length: number): boolean => {
  throw new Error('not implemented');
};

export const submitGuess = (_state: GameState, _guess: string): GameState => {
  throw new Error('not implemented');
};
