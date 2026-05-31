export type FrequencyMode = "char" | "word" | "line";

export interface FrequencyRow {
  key: string;
  count: number;
  percent: number;
}

/** Tally how often each character, word or line occurs, sorted by frequency. */
export function analyzeFrequency(text: string, mode: FrequencyMode): FrequencyRow[] {
  if (!text) return [];

  let tokens: string[];
  if (mode === "char") {
    tokens = Array.from(text).filter((c) => c !== "\n" && c !== "\r");
  } else if (mode === "word") {
    tokens = text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
  } else {
    tokens = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  }

  const total = tokens.length;
  if (total === 0) return [];

  const counts = new Map<string, number>();
  for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);

  return [...counts.entries()]
    .map(([key, count]) => ({
      key,
      count,
      percent: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}
