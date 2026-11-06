import type { Base } from './digit-validator.js';

export type RecordEntry = {
  date: string;
  attempts: number;
  timeMs: number;
};

export type RecordStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

const TOP_N = 10;

export const addRecord = (
  records: RecordEntry[],
  entry: RecordEntry,
): RecordEntry[] => {
  const withNewEntry = [...records, entry];

  const byAttemptsThenTime = (a: RecordEntry, b: RecordEntry): number => {
    if (a.attempts !== b.attempts) return a.attempts - b.attempts;
    return a.timeMs - b.timeMs;
  };

  const sorted = withNewEntry.sort(byAttemptsThenTime);

  return sorted.slice(0, TOP_N);
};

export const recordsKey = (length: number, base: Base): string =>
  `records-${length}-${base}`;

export const loadRecords = (
  _storage: RecordStorage,
  _length: number,
  _base: Base,
): RecordEntry[] => {
  throw new Error('not implemented');
};

export const saveRecords = (
  _storage: RecordStorage,
  _length: number,
  _base: Base,
  _records: RecordEntry[],
): void => {
  throw new Error('not implemented');
};
