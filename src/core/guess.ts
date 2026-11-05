import { type Base, createDigitValidator } from './digit-validator.js';

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
