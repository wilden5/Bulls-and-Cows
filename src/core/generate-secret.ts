import type { Base } from './digit-validator.js';

export type Random = () => number;

export const generateSecret = (
  _length: number,
  _base: Base,
  _random: Random = Math.random,
): string => {
  throw new Error('not implemented');
};
