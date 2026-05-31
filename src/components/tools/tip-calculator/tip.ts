export interface TipResult {
  ok: boolean;
  tip: number;
  total: number;
  perPerson: number;
  error?: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Calculate a tip and split a bill between people. */
export function calculateTip(bill: number, tipPercent: number, people: number): TipResult {
  if (!Number.isFinite(bill) || bill < 0) {
    return { ok: false, tip: 0, total: 0, perPerson: 0, error: "Enter a valid bill amount" };
  }
  const headcount = Math.max(1, Math.floor(people) || 1);
  const tip = round2((bill * (tipPercent || 0)) / 100);
  const total = round2(bill + tip);
  const perPerson = round2(total / headcount);
  return { ok: true, tip, total, perPerson };
}
