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

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const secretChars = [...secret.toLowerCase()];
  const guessChars = [...guess.toLowerCase()];

  const bulls = secretChars.reduce(
    (count, char, index) => count + (char === guessChars[index] ? 1 : 0),
    0,
  );

  const matchedCount = guessChars.filter((char) =>
    secretChars.includes(char),
  ).length;

  const cows = matchedCount - bulls;

  return { bulls, cows };
};
