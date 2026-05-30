export const PHI = 1.618033988749895;

export type GoldenMode = "whole" | "longer" | "shorter";

export interface GoldenResult {
  whole: number;
  longer: number;
  shorter: number;
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Given a value that represents the whole, the longer segment or the shorter
 * segment, derive the full golden-ratio triple.
 */
export function goldenFrom(value: number, mode: GoldenMode): GoldenResult | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  let whole: number;
  if (mode === "whole") whole = value;
  else if (mode === "longer") whole = value + value / PHI;
  else whole = value * PHI + value; // shorter -> whole = shorter*phi + shorter

  const longer = whole / PHI;
  const shorter = whole - longer;
  return { whole: round(whole), longer: round(longer), shorter: round(shorter) };
}
