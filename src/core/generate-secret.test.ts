import { describe, it, expect } from 'vitest';
import { generateSecret } from './generate-secret.js';
import { createDigitValidator } from './digit-validator.js';

describe('generateSecret', () => {
  const alwaysZero = () => 0;

  it('picks pool digits in order when random always returns 0', () => {
    expect(generateSecret(4, 10, alwaysZero)).toBe('0123');
  });

  it('works for binary base', () => {
    expect(generateSecret(2, 2, alwaysZero)).toBe('01');
  });

  it('picks from the full hex alphabet (last digits)', () => {
    expect(generateSecret(4, 16, () => 0.999)).toBe('fedc');
  });

  it('produces a string of the requested length', () => {
    expect(generateSecret(3, 10).length).toBe(3);
  });

  it('produces only valid digits for the base', () => {
    const isDigit = createDigitValidator(10);
    expect([...generateSecret(4, 10)].every(isDigit)).toBe(true);
  });

  it('produces unique digits', () => {
    expect(new Set(generateSecret(6, 10)).size).toBe(6);
  });

  it('throws when length exceeds the number of unique digits in base', () => {
    expect(() => generateSecret(3, 2, alwaysZero)).toThrow('cannot generate');
  });
});
