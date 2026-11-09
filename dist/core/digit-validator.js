const ALPHABET = '0123456789abcdef';
export const createDigitValidator = (base) => {
    const validChars = ALPHABET.slice(0, base);
    return (char) => {
        if (char.length !== 1)
            return false;
        return validChars.includes(char.toLowerCase());
    };
};
//# sourceMappingURL=digit-validator.js.map