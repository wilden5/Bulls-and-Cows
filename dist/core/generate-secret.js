export const generateSecret = (length, base, random = Math.random) => {
    const pool = Array.from({ length: base }, (_, i) => i.toString(base));
    const pick = (remaining, digits) => {
        if (remaining === 0)
            return '';
        const index = Math.floor(random() * digits.length);
        const digit = digits[index];
        if (digit === undefined) {
            throw new Error(`generateSecret: cannot generate ${length} unique digits in base ${base}`);
        }
        return (digit +
            pick(remaining - 1, digits.filter((_, i) => i !== index)));
    };
    return pick(length, pool);
};
//# sourceMappingURL=generate-secret.js.map