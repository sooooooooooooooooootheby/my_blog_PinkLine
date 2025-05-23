function isoToRfc2822(isoString) {
    const date = new Date(isoString);
    if (isNaN(date)) throw new Error('Invalid ISO 8601 date');
    return date.toUTCString().replace('GMT', '+0800');
}

const isoTime = '2024-11-22T20:25:10.000Z';
const isoTime1 = '2025-01-15T12:22:54.000Z';
console.log("date: " + isoToRfc2822(isoTime));
console.log("updaate: " + isoToRfc2822(isoTime1));