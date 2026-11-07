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

const isRecordEntry = (value: unknown): value is RecordEntry => {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as RecordEntry;

  return (
    typeof candidate.date === 'string' &&
    typeof candidate.attempts === 'number' &&
    typeof candidate.timeMs === 'number'
  );
};

export const recordsKey = (length: number, base: Base): string =>
  `records-${length}-${base}`;

export const loadRecords = (
  storage: RecordStorage,
  length: number,
  base: Base,
): RecordEntry[] => {
  const raw = storage.getItem(recordsKey(length, base));

  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isRecordEntry);
  } catch {
    return [];
  }
};

export const saveRecords = (
  storage: RecordStorage,
  length: number,
  base: Base,
  records: RecordEntry[],
): void => {
  storage.setItem(recordsKey(length, base), JSON.stringify(records));
};
