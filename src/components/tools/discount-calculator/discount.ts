export interface DiscountResult {
  ok: boolean;
  saved: number;
  finalPrice: number;
  error?: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Compute the sale price and amount saved from a discount percentage. */
export function calculateDiscount(original: number, percent: number): DiscountResult {
  if (!Number.isFinite(original) || original < 0) {
    return { ok: false, saved: 0, finalPrice: 0, error: "Enter a valid original price" };
  }
  const pct = Math.min(100, Math.max(0, percent || 0));
  const saved = round2((original * pct) / 100);
  const finalPrice = round2(original - saved);
  return { ok: true, saved, finalPrice };
}
