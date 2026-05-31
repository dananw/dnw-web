"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { calculateAge } from "./age";

const AgeCalculator = () => {
  const [birth, setBirth] = useState("2000-01-01");
  const result = useMemo(() => calculateAge(birth), [birth]);

  const totals = result.ok
    ? [
        { label: "Total days", value: result.totalDays.toLocaleString("en-US") },
        { label: "Total months", value: (result.years * 12 + result.months).toLocaleString("en-US") },
        { label: "Next birthday", value: `${result.nextBirthdayInDays} days` },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="age-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Date of birth
        </label>
        <input
          id="age-input"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 sm:w-64"
        />
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
              Age
            </span>
            <p className="mt-2 font-display text-3xl tracking-tight text-foreground">
              {result.years}
              <span className="text-muted-foreground"> y </span>
              {result.months}
              <span className="text-muted-foreground"> m </span>
              {result.days}
              <span className="text-muted-foreground"> d</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {totals.map((t) => (
              <div key={t.label} className="rounded-lg border border-border px-4 py-3 text-center">
                <div className="font-mono text-lg text-foreground">{t.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Calculates an exact age relative to today, accounting for varying month
        lengths and leap years. Everything stays in your browser.
      </p>
    </div>
  );
};

export default AgeCalculator;
