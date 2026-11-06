export type RecordEntry = {
  date: string;
  attempts: number;
  timeMs: number;
};

export const addRecord = (
  _records: RecordEntry[],
  _entry: RecordEntry,
): RecordEntry[] => {
  throw new Error('not implemented');
};
