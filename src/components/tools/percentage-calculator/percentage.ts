/** Trim trailing zeros from a rounded result. */
function tidy(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Number(n.toFixed(4)).toString();
}

/** "What is P% of N?" */
export function percentOf(p: number, n: number): string {
  if (!Number.isFinite(p) || !Number.isFinite(n)) return "—";
  return tidy((p / 100) * n);
}

/** "A is what percent of B?" */
export function whatPercent(a: number, b: number): string {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return "—";
  return tidy((a / b) * 100);
}

/** "Percentage change from A to B." */
export function percentChange(from: number, to: number): string {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return "—";
  return tidy(((to - from) / Math.abs(from)) * 100);
}
