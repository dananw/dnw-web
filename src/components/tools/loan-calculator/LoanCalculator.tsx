"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { calculateLoan } from "./loan";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("30");

  const result = useMemo(
    () => calculateLoan(Number(principal), Number(rate), Number(years)),
    [principal, rate, years]
  );

  const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="loan-principal" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Amount
          </label>
          <input
            id="loan-principal"
            type="number"
            min={0}
            step="any"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="loan-rate" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Annual rate %
          </label>
          <input
            id="loan-rate"
            type="number"
            min={0}
            step="any"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="loan-years" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Term (years)
          </label>
          <input
            id="loan-years"
            type="number"
            min={0}
            step="any"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-6 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Monthly payment
            </span>
            <p className="mt-2 font-display text-4xl tracking-tight text-foreground">
              {money(result.monthlyPayment)}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border px-4 py-3 text-center">
              <div className="font-mono text-lg text-foreground">{money(result.totalPaid)}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Total repaid</div>
            </div>
            <div className="rounded-lg border border-border px-4 py-3 text-center">
              <div className="font-mono text-lg text-foreground">{money(result.totalInterest)}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Total interest</div>
            </div>
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Assumes a fixed-rate, fully amortizing loan with monthly compounding.
        Amounts are unitless. Calculated locally.
      </p>
    </div>
  );
};

export default LoanCalculator;
