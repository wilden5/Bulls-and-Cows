export type Base = 2 | 8 | 10 | 16;

const ALPHABET = '0123456789abcdef';

export const createDigitValidator = (base: Base) => {
  const validChars = ALPHABET.slice(0, base);

  return (char: string): boolean => {
    if (char.length !== 1) return false;
    return validChars.includes(char.toLowerCase());
  };
};
