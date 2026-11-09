const cache = new Map();
export const countPossibleSecrets = (length, base) => {
    const key = `${length}-${base}`;
    const cached = cache.get(key);
    if (cached !== undefined)
        return cached;
    let result;
    if (length === 0) {
        result = 1;
    }
    else if (length > base) {
        result = 0;
    }
    else {
        result = base * countPossibleSecrets(length - 1, base - 1);
    }
    cache.set(key, result);
    return result;
};
//# sourceMappingURL=count-possible-secrets.js.map