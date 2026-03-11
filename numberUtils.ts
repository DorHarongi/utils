/**
 * Rounds a number to a "nice" human-friendly value.
 * e.g. 286,905 → 300,000;  4,312 → 4,500;  1,573,000 → 1,500,000;  27,386 → 25,000
 */
export function prettifyNumber(n: number): number {
    if (n <= 0) return 0;
    if (n < 100) return Math.round(n / 10) * 10;

    const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
    const step = magnitude / 2;
    return Math.round(n / step) * step;
}
