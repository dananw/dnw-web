export const DEFAULT_BASE = 16;

/** Trim trailing zeros from a fixed-precision number. */
function tidy(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Number(n.toFixed(5)).toString();
}

/** Convert px to rem for a given root font size. */
export function pxToRem(px: number, base: number = DEFAULT_BASE): string {
  if (!base) return "—";
  return tidy(px / base);
}

/** Convert rem to px for a given root font size. */
export function remToPx(rem: number, base: number = DEFAULT_BASE): string {
  return tidy(rem * base);
}

/** Common pixel sizes for the quick-reference table. */
export const COMMON_PX = [
  1, 2, 4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64, 80, 96,
];

export interface ReferenceRow {
  px: number;
  rem: string;
}

export function referenceTable(base: number = DEFAULT_BASE): ReferenceRow[] {
  return COMMON_PX.map((px) => ({ px, rem: pxToRem(px, base) }));
}
