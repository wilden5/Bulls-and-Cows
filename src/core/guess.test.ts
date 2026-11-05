import { describe, it, expect } from 'vitest';
import { isValidGuess } from './guess.js';

describe('isValidGuess', () => {
  it('accepts a valid decimal guess', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects wrong length', () => {
    expect(isValidGuess('012', 4, 10)).toBe(false);
    expect(isValidGuess('01234', 4, 10)).toBe(false);
  });

  it('rejects invalid characters for the base', () => {
    expect(isValidGuess('01a3', 4, 10)).toBe(false);
    expect(isValidGuess('81', 2, 8)).toBe(false);
  });

  it('rejects duplicated digits', () => {
    expect(isValidGuess('0112', 4, 10)).toBe(false);
  });

  it('accepts uppercase hex digits', () => {
    expect(isValidGuess('A1B2', 4, 16)).toBe(true);
  });

  it('treats A and a as the same digit in hex', () => {
    expect(isValidGuess('Aa12', 4, 16)).toBe(false);
  });
});
