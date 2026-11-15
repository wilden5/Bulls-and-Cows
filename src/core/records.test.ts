import {
  addRecord,
  loadRecords,
  type RecordEntry,
  type RecordStorage,
  recordsKey,
  saveRecords,
} from './records.js';
import { describe, it, expect } from 'vitest';

const entry = (attempts: number, timeMs: number): RecordEntry => ({
  date: '2026-11-06T12:00:00.000Z',
  attempts,
  timeMs,
});

const createFakeStorage = (): RecordStorage => {
  const data = new Map<string, string>();

  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
};

describe('addRecord', () => {
  it('adds the first record to an empty list', () => {
    expect(addRecord([], entry(4, 60_000))).toEqual([entry(4, 60_000)]);
  });

  it('sorts records by attempts ascending', () => {
    const result = addRecord([entry(5, 10_000)], entry(3, 90_000));

    expect(result.map((record) => record.attempts)).toEqual([3, 5]);
  });

  it('breaks ties on attempts by time', () => {
    const result = addRecord([entry(4, 60_000)], entry(4, 30_000));

    expect(result.map((record) => record.timeMs)).toEqual([30_000, 60_000]);
  });

  it('keeps only the top 10 records', () => {
    const ten = Array.from({ length: 10 }, (_, i) => entry(i + 1, 60_000));
    const result = addRecord(ten, entry(11, 60_000));

    expect(result).toHaveLength(10);
    expect(result.some((record) => record.attempts === 11)).toBe(false);
  });

  it('does not mutate the original list', () => {
    const original = [entry(5, 60_000)];

    addRecord(original, entry(3, 60_000));

    expect(original).toEqual([entry(5, 60_000)]);
  });
});

describe('record storage', () => {
  it('saves and loads records back', () => {
    const storage = createFakeStorage();
    const records = [entry(4, 60_000)];

    saveRecords(storage, 4, 10, records);

    expect(loadRecords(storage, 4, 10)).toEqual(records);
  });

  it('returns an empty list when nothing is stored', () => {
    const storage = createFakeStorage();

    expect(loadRecords(storage, 4, 10)).toEqual([]);
  });

  it('keeps different lengths and bases apart', () => {
    const storage = createFakeStorage();

    saveRecords(storage, 4, 10, [entry(4, 60_000)]);
    saveRecords(storage, 2, 16, [entry(2, 10_000)]);

    expect(loadRecords(storage, 4, 10)).toEqual([entry(4, 60_000)]);
    expect(loadRecords(storage, 2, 16)).toEqual([entry(2, 10_000)]);
  });

  it('returns an empty list when stored data is corrupted', () => {
    const storage = createFakeStorage();

    storage.setItem(recordsKey(4, 10), '{oops');

    expect(loadRecords(storage, 4, 10)).toEqual([]);
  });

  it('ignores entries with a wrong shape', () => {
    const storage = createFakeStorage();

    storage.setItem(recordsKey(4, 10), JSON.stringify([{ attempts: 'many' }]));

    expect(loadRecords(storage, 4, 10)).toEqual([]);
  });
});
