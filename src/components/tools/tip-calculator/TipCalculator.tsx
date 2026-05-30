"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { calculateTip } from "./tip";

const QUICK_TIPS = [10, 15, 18, 20, 25];

const TipCalculator = () => {
  const [bill, setBill] = useState("60");
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState(2);

  const result = useMemo(
    () => calculateTip(Number(bill), tip, people),
    [bill, tip, people]
  );

  const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tip-bill" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Bill amount
          </label>
          <input
            id="tip-bill"
            type="number"
            min={0}
            step="any"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="tip-people" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Split between
          </label>
          <input
            id="tip-people"
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="tip-pct" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Tip
          </label>
          <span className="font-mono text-sm text-foreground">{tip}%</span>
        </div>
        <input
          id="tip-pct"
          type="range"
          min={0}
          max={30}
          value={tip}
          onChange={(e) => setTip(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {QUICK_TIPS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setTip(q)}
              aria-pressed={tip === q}
              className={`rounded-lg border px-3 py-1 font-mono text-xs transition-colors ${
                tip === q ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {q}%
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Tip", value: result.tip },
            { label: "Total", value: result.total },
            { label: "Per person", value: result.perPerson },
          ].map((r) => (
            <div key={r.label} className="rounded-lg border border-border px-4 py-4 text-center">
              <div className="font-display text-2xl tracking-tight text-foreground">{money(r.value)}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{r.label}</div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Amounts are unitless, so it works with any currency. Everything is
        calculated locally.
      </p>
    </div>
  );
};

export default TipCalculator;
