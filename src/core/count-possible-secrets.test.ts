import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from './count-possible-secrets.js';

describe('countPossibleSecrets', () => {
  it('dec: length 4 = 10·9·8·7 = 5040', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('dec: length 2 = 10·9 = 90', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it('bin: length 2 = 2·1 = 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('oct: length 3 = 8·7·6 = 336', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('hex: length 6 = 16·15·14·13·12·11 = 5765760', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('dec: length 6 = 151200', () => {
    expect(countPossibleSecrets(6, 10)).toBe(151200);
  });

  it('empty secret = exactly one way', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('length greater than base = impossible without repeats', () => {
    expect(countPossibleSecrets(5, 2)).toBe(0);
  });
});
