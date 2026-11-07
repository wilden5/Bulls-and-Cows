import { type Base, createDigitValidator } from '../core/digit-validator.js';

export const filterInput = (
  value: string,
  base: Base,
  length: number,
): string => {
  const isValidDigit = createDigitValidator(base);

  const validChars = [...value].filter(isValidDigit);

  return validChars.slice(0, length).join('');
};
