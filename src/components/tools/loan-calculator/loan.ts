export interface LoanResult {
  ok: boolean;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  error?: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Compute the monthly payment for a fixed-rate amortizing loan. */
export function calculateLoan(
  principal: number,
  annualRatePercent: number,
  years: number
): LoanResult {
  if (!(principal > 0) || !(years > 0)) {
    return { ok: false, monthlyPayment: 0, totalPaid: 0, totalInterest: 0, error: "Enter a positive amount and term" };
  }
  const n = Math.round(years * 12);
  const r = annualRatePercent / 100 / 12;

  let monthly: number;
  if (r === 0) {
    monthly = principal / n;
  } else {
    const factor = Math.pow(1 + r, n);
    monthly = (principal * r * factor) / (factor - 1);
  }

  const monthlyPayment = round2(monthly);
  const totalPaid = round2(monthly * n);
  const totalInterest = round2(totalPaid - principal);
  return { ok: true, monthlyPayment, totalPaid, totalInterest };
}
