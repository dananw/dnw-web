export interface CompoundResult {
  ok: boolean;
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  error?: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface CompoundInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  /** Compounds per year (e.g. 12 for monthly). */
  timesPerYear: number;
  /** Optional contribution added each compounding period. */
  contribution: number;
}

/** Project compound growth, including periodic contributions. */
export function compoundInterest(input: CompoundInput): CompoundResult {
  const { principal, annualRatePercent, years, timesPerYear, contribution } = input;
  if (!(principal >= 0) || !(years > 0) || !(timesPerYear > 0)) {
    return { ok: false, finalBalance: 0, totalContributions: 0, totalInterest: 0, error: "Enter valid positive values" };
  }

  const periods = Math.round(years * timesPerYear);
  const rate = annualRatePercent / 100 / timesPerYear;

  let balance = principal;
  for (let i = 0; i < periods; i++) {
    balance = balance * (1 + rate) + contribution;
  }

  const totalContributions = round2(principal + contribution * periods);
  const finalBalance = round2(balance);
  return {
    ok: true,
    finalBalance,
    totalContributions,
    totalInterest: round2(finalBalance - totalContributions),
  };
}
