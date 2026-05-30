export interface StatsResult {
  ok: boolean;
  count: number;
  sum: string;
  mean: string;
  median: string;
  mode: string;
  min: string;
  max: string;
  range: string;
  stdDev: string;
  error?: string;
}

const tidy = (n: number) => Number(n.toFixed(6)).toString();

/** Parse numbers separated by commas, spaces or newlines. */
export function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

/** Compute summary statistics for a list of numbers. */
export function computeStats(input: string): StatsResult {
  const empty = {
    count: 0,
    sum: "0",
    mean: "0",
    median: "0",
    mode: "—",
    min: "0",
    max: "0",
    range: "0",
    stdDev: "0",
  };
  const nums = parseNumbers(input);
  if (nums.length === 0) {
    return { ok: false, ...empty, error: "Enter some numbers" };
  }

  const count = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(count / 2);
  const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  // Mode(s): the most frequent value(s).
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const maxFreq = Math.max(...freq.values());
  const modes = maxFreq === 1 ? [] : [...freq.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v);

  const min = sorted[0];
  const max = sorted[count - 1];
  const variance = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0) / count;

  return {
    ok: true,
    count,
    sum: tidy(sum),
    mean: tidy(mean),
    median: tidy(median),
    mode: modes.length ? modes.map(tidy).join(", ") : "—",
    min: tidy(min),
    max: tidy(max),
    range: tidy(max - min),
    stdDev: tidy(Math.sqrt(variance)),
  };
}
