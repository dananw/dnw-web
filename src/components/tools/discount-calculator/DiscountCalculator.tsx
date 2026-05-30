"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { calculateDiscount } from "./discount";

const DiscountCalculator = () => {
  const [original, setOriginal] = useState("120");
  const [percent, setPercent] = useState(25);

  const result = useMemo(
    () => calculateDiscount(Number(original), percent),
    [original, percent]
  );

  const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="disc-original" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Original price
        </label>
        <input
          id="disc-original"
          type="number"
          min={0}
          step="any"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 sm:w-56"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="disc-pct" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Discount
          </label>
          <span className="font-mono text-sm text-foreground">{percent}%</span>
        </div>
        <input
          id="disc-pct"
          type="range"
          min={0}
          max={100}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-5 text-center">
            <div className="font-display text-3xl tracking-tight text-foreground">{money(result.finalPrice)}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Final price</div>
          </div>
          <div className="rounded-lg border border-border px-4 py-5 text-center">
            <div className="font-display text-3xl tracking-tight text-accent">−{money(result.saved)}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">You save</div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Enter the original price and discount percentage to see the sale price
        and savings. Amounts are unitless. Calculated locally.
      </p>
    </div>
  );
};

export default DiscountCalculator;
