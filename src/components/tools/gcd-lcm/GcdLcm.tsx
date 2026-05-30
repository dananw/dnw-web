"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { computeGcdLcm } from "./gcdLcm";

const GcdLcm = () => {
  const [input, setInput] = useState("12, 18, 24");
  const result = useMemo(() => computeGcdLcm(input), [input]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="gcd-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Numbers
        </label>
        <input
          id="gcd-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="12, 18, 24"
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-lg text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border px-4 py-5 text-center">
            <div className="font-display text-3xl tracking-tight text-foreground">
              {result.gcd.toLocaleString("en-US")}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Greatest common divisor
            </div>
          </div>
          <div className="rounded-lg border border-border px-4 py-5 text-center">
            <div className="font-display text-3xl tracking-tight text-foreground">
              {result.lcm.toLocaleString("en-US")}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Least common multiple
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Enter two or more integers separated by commas or spaces. The GCD and LCM
        are computed across the whole list. Runs locally.
      </p>
    </div>
  );
};

export default GcdLcm;
