import { createDigitValidator } from '../core/digit-validator.js';
export const filterInput = (value, base, length) => {
    const isValidDigit = createDigitValidator(base);
    const validChars = [...value].filter(isValidDigit);
    return validChars.slice(0, length).join('');
};
//# sourceMappingURL=filter-input.js.map