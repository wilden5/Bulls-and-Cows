export type RecordEntry = {
  date: string;
  attempts: number;
  timeMs: number;
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
