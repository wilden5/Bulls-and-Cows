import { createDigitValidator } from './digit-validator.js';
export const isValidGuess = (guess, length, base) => {
    return (guess.length === length &&
        [...guess].every(createDigitValidator(base)) &&
        new Set(guess.toLowerCase()).size === length);
};
export const evaluateGuess = (secret, guess) => {
    const secretChars = [...secret.toLowerCase()];
    const guessChars = [...guess.toLowerCase()];
    const bulls = secretChars.reduce((count, char, index) => count + (char === guessChars[index] ? 1 : 0), 0);
    const matchedCount = guessChars.filter((char) => secretChars.includes(char)).length;
    const cows = matchedCount - bulls;
    return { bulls, cows };
};
//# sourceMappingURL=guess.js.map