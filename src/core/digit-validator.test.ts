import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './digit-validator.js';

describe('createDigitValidator', () => {
  describe('Decimal (base 10)', () => {
    const isDecimal = createDigitValidator(10);

    it('should return true for valid decimal digits', () => {
      expect(isDecimal('0')).toBe(true);
      expect(isDecimal('5')).toBe(true);
      expect(isDecimal('9')).toBe(true);
    });

    it('should return false for invalid decimal characters', () => {
      expect(isDecimal('a')).toBe(false);
      expect(isDecimal('F')).toBe(false);
      expect(isDecimal('/')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isDecimal('')).toBe(false);
    });

    it('should return false for multi-character strings', () => {
      expect(isDecimal('12')).toBe(false);
      expect(isDecimal('abc')).toBe(false);
    });
  });

  describe('Hexadecimal (base 16)', () => {
    const isHex = createDigitValidator(16);

    it('should return true for lowercase hex letters', () => {
      expect(isHex('a')).toBe(true);
      expect(isHex('f')).toBe(true);
    });

    it('should return true for uppercase hex letters', () => {
      expect(isHex('A')).toBe(true);
      expect(isHex('F')).toBe(true);
    });

    it('should return true for numbers in hex', () => {
      expect(isHex('0')).toBe(true);
      expect(isHex('9')).toBe(true);
    });

    it('should return false for invalid hex characters', () => {
      expect(isHex('g')).toBe(false);
      expect(isHex('G')).toBe(false);
    });
  });

  describe('Octal (base 8)', () => {
    const isOctal = createDigitValidator(8);

    it('should return true for digits 0-7', () => {
      expect(isOctal('0')).toBe(true);
      expect(isOctal('7')).toBe(true);
    });

    it('should return false for digits 8 and 9', () => {
      expect(isOctal('8')).toBe(false);
      expect(isOctal('9')).toBe(false);
    });
  });

  describe('Binary (base 2)', () => {
    const isBinary = createDigitValidator(2);

    it('should return true for 0 and 1', () => {
      expect(isBinary('0')).toBe(true);
      expect(isBinary('1')).toBe(true);
    });

    it('should return false for digit 2', () => {
      expect(isBinary('2')).toBe(false);
    });
  });
});
