import { describe, it, expect } from 'vitest';
import { evaluateGuess, isValidGuess } from './guess.js';

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

describe('evaluateGuess', () => {
  it('all digits in place = 4 bulls', () => {
    expect(evaluateGuess('0123', '0123')).toEqual({ bulls: 4, cows: 0 });
  });

  it('all digits present, none in place = 4 cows', () => {
    expect(evaluateGuess('0123', '3012')).toEqual({ bulls: 0, cows: 4 });
  });

  it('two in place, two swapped = 2 bulls 2 cows', () => {
    expect(evaluateGuess('0123', '0132')).toEqual({ bulls: 2, cows: 2 });
  });

  it('no digits present = 0 and 0', () => {
    expect(evaluateGuess('0123', '4567')).toEqual({ bulls: 0, cows: 0 });
  });

  it('one digit present out of place = 1 cow', () => {
    expect(evaluateGuess('0123', '4561')).toEqual({ bulls: 0, cows: 1 });
  });

  it('hex: uppercase guess counts as 4 bulls', () => {
    expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
  });

  it('hex: case-insensitive cows', () => {
    expect(evaluateGuess('a1b2', '1a2b')).toEqual({ bulls: 0, cows: 4 });
  });
});
