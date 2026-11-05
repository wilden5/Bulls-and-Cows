import { type Base, createDigitValidator } from './digit-validator.js';

export type GuessResult = { bulls: number; cows: number };

export const isValidGuess = (
  guess: string,
  length: number,
  base: Base,
): boolean => {
  return (
    guess.length === length &&
    [...guess].every(createDigitValidator(base)) &&
    new Set(guess.toLowerCase()).size === length
  );
};

export const evaluateGuess = (_secret: string, _guess: string): GuessResult => {
  throw new Error('not implemented');
};
