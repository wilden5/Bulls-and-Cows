import { describe, it, expect } from 'vitest';
import { filterInput } from './filter-input.js';

describe('filterInput', () => {
  it('keeps valid decimal digits', () => {
    expect(filterInput('1234', 10, 4)).toBe('1234');
  });

  it('drops characters that are impossible in the base', () => {
    expect(filterInput('1a23', 10, 4)).toBe('123');
  });

  it('accepts hex letters in any case', () => {
    expect(filterInput('A1b2', 16, 4)).toBe('A1b2');
  });

  it('truncates the value to the secret length', () => {
    expect(filterInput('123456', 10, 4)).toBe('1234');
  });

  it('filters before truncating in binary', () => {
    expect(filterInput('1201', 2, 2)).toBe('10');
  });

  it('returns an empty string for empty input', () => {
    expect(filterInput('', 10, 4)).toBe('');
  });
});
