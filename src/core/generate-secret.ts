import type { Base } from './digit-validator.js';

export type Random = () => number;

export const generateSecret = (
  length: number,
  base: Base,
  random: Random = Math.random,
): string => {
  const pool = Array.from({ length: base }, (_, i) => i.toString(base));

  const pick = (remaining: number, digits: string[]): string => {
    if (remaining === 0) return '';

    const index = Math.floor(random() * digits.length);
    const digit = digits[index];

    if (digit === undefined) {
      throw new Error(
        `generateSecret: cannot generate ${length} unique digits in base ${base}`,
      );
    }
    return (
      digit +
      pick(
        remaining - 1,
        digits.filter((_, i) => i !== index),
      )
    );
  };
  return pick(length, pool);
};
