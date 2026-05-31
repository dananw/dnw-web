"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { bmiImperial, bmiMetric } from "./bmi";

type System = "metric" | "imperial";

const BmiCalculator = () => {
  const [system, setSystem] = useState<System>("metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");

  const result = useMemo(() => {
    const w = Number(weight);
    const h = Number(height);
    return system === "metric" ? bmiMetric(w, h) : bmiImperial(w, h);
  }, [system, weight, height]);

  const switchSystem = (s: System) => {
    setSystem(s);
    if (s === "metric") {
      setWeight("70");
      setHeight("175");
    } else {
      setWeight("154");
      setHeight("69");
    }
  };

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["metric", "imperial"] as System[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => switchSystem(s)}
            aria-pressed={system === s}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase capitalize tracking-[0.12em] transition-colors ${
              system === s
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="bmi-weight"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Weight ({system === "metric" ? "kg" : "lb"})
          </label>
          <input
            id="bmi-weight"
            type="number"
            min={0}
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="bmi-height"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Height ({system === "metric" ? "cm" : "in"})
          </label>
          <input
            id="bmi-height"
            type="number"
            min={0}
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
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
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-6 text-center">
          <div className="font-display text-5xl tracking-tight text-foreground">
            {result.bmi}
          </div>
          <div className="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-accent">
            {result.category}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        BMI is a rough screening number, not a diagnosis — it doesn&apos;t
        account for muscle, age or body composition. Calculated locally.
      </p>
    </div>
  );
};

export default BmiCalculator;
