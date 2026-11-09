const TOP_N = 10;
export const addRecord = (records, entry) => {
    const withNewEntry = [...records, entry];
    const byAttemptsThenTime = (a, b) => {
        if (a.attempts !== b.attempts)
            return a.attempts - b.attempts;
        return a.timeMs - b.timeMs;
    };
    const sorted = withNewEntry.sort(byAttemptsThenTime);
    return sorted.slice(0, TOP_N);
};
const isRecordEntry = (value) => {
    if (typeof value !== 'object' || value === null)
        return false;
    const candidate = value;
    return (typeof candidate.date === 'string' &&
        typeof candidate.attempts === 'number' &&
        typeof candidate.timeMs === 'number');
};
export const recordsKey = (length, base) => `records-${length}-${base}`;
export const loadRecords = (storage, length, base) => {
    const raw = storage.getItem(recordsKey(length, base));
    if (raw === null)
        return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return [];
        return parsed.filter(isRecordEntry);
    }
    catch {
        return [];
    }
};
export const saveRecords = (storage, length, base, records) => {
    storage.setItem(recordsKey(length, base), JSON.stringify(records));
};
//# sourceMappingURL=records.js.map