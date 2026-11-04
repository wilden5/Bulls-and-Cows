export type Base = 2 | 8 | 10 | 16;

export const createDigitValidator = (_base: Base) => {
  return (_char: string): boolean => {
    throw new Error('not implemented');
  };
};
