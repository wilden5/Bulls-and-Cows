const cache = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}-${base}`;
  const cached = cache.get(key);

  if (cached !== undefined) return cached;

  let result: number;

  if (length === 0) {
    result = 1;
  } else if (length > base) {
    result = 0;
  } else {
    result = base * countPossibleSecrets(length - 1, base - 1);
  }

  cache.set(key, result);
  return result;
};
