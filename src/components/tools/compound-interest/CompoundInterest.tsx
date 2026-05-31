"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { compoundInterest } from "./compound";

const FREQUENCIES = [
  { label: "Annually", value: 1 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [timesPerYear, setTimesPerYear] = useState(12);
  const [contribution, setContribution] = useState("100");

  const result = useMemo(
    () =>
      compoundInterest({
        principal: Number(principal),
        annualRatePercent: Number(rate),
        years: Number(years),
        timesPerYear,
        contribution: Number(contribution),
      }),
    [principal, rate, years, timesPerYear, contribution]
  );

  const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ci-principal" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Initial amount
          </label>
          <input id="ci-principal" type="number" min={0} step="any" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60" />
        </div>
        <div>
          <label htmlFor="ci-contribution" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Added each period
          </label>
          <input id="ci-contribution" type="number" min={0} step="any" value={contribution} onChange={(e) => setContribution(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60" />
        </div>
        <div>
          <label htmlFor="ci-rate" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Annual rate %
          </label>
          <input id="ci-rate" type="number" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60" />
        </div>
        <div>
          <label htmlFor="ci-years" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Years
          </label>
          <input id="ci-years" type="number" min={0} step="any" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60" />
        </div>
      </div>

      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Compounding</span>
        <div className="inline-flex flex-wrap rounded-lg border border-border p-1">
          {FREQUENCIES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setTimesPerYear(f.value)}
              aria-pressed={timesPerYear === f.value}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                timesPerYear === f.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
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
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Final balance</span>
            <p className="mt-2 font-display text-4xl tracking-tight text-foreground">{money(result.finalBalance)}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border px-4 py-3 text-center">
              <div className="font-mono text-lg text-foreground">{money(result.totalContributions)}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Total paid in</div>
            </div>
            <div className="rounded-lg border border-border px-4 py-3 text-center">
              <div className="font-mono text-lg text-accent">{money(result.totalInterest)}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Interest earned</div>
            </div>
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Contributions are added at the end of each compounding period. Amounts
        are unitless, so any currency works. Calculated locally.
      </p>
    </div>
  );
};

export default CompoundInterest;
