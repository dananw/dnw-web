export interface Ratio {
  w: number;
  h: number;
}

export interface Preset {
  label: string;
  ratio: Ratio;
}

export const PRESETS: Preset[] = [
  { label: "16:9", ratio: { w: 16, h: 9 } },
  { label: "4:3", ratio: { w: 4, h: 3 } },
  { label: "1:1", ratio: { w: 1, h: 1 } },
  { label: "3:2", ratio: { w: 3, h: 2 } },
  { label: "21:9", ratio: { w: 21, h: 9 } },
  { label: "9:16", ratio: { w: 9, h: 16 } },
];

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

/** Reduce a width/height pair to its simplest integer ratio. */
export function simplifyRatio(w: number, h: number): Ratio | null {
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return null;
  }
  // Scale to integers in case of fractional inputs, then divide by the gcd.
  const scale = 1000;
  const wi = Math.round(w * scale);
  const hi = Math.round(h * scale);
  const d = gcd(wi, hi);
  return { w: wi / d, h: hi / d };
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

/** Given a ratio and a known width, solve for the height. */
export function solveHeight(ratio: Ratio, width: number): number | null {
  if (!ratio.w || !Number.isFinite(width)) return null;
  return round((width * ratio.h) / ratio.w);
}

/** Given a ratio and a known height, solve for the width. */
export function solveWidth(ratio: Ratio, height: number): number | null {
  if (!ratio.h || !Number.isFinite(height)) return null;
  return round((height * ratio.w) / ratio.h);
}

/** Human label like "16 : 9" for a simplified ratio. */
export function formatRatio(r: Ratio | null): string {
  if (!r) return "—";
  return `${r.w} : ${r.h}`;
}
