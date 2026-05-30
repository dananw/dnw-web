"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { numberProperties } from "./numberProperties";

const NumberProperties = () => {
  const [input, setInput] = useState("360");
  const result = useMemo(() => numberProperties(input), [input]);

  const factorization =
    result.ok && result.primeFactors.length
      ? result.primeFactors
          .map((f) => (f.exponent > 1 ? `${f.prime}^${f.exponent}` : `${f.prime}`))
          .join(" × ")
      : "—";

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="np-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Integer
        </label>
        <input
          id="np-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode="numeric"
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-2xl text-foreground outline-none transition-colors focus:border-accent/60 ${
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
        result.value > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { label: result.isPrime ? "Prime" : "Composite", on: true },
                { label: result.isEven ? "Even" : "Odd", on: true },
                { label: "Perfect square", on: result.isPerfectSquare },
              ]
                .filter((b) => b.on)
                .map((b) => (
                  <span
                    key={b.label}
                    className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-accent"
                  >
                    {b.label}
                  </span>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-x-4 overflow-hidden rounded-lg border border-border sm:grid-cols-2">
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Divisors
                </span>
                <span className="font-mono text-sm text-foreground">
                  {result.divisors.length}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Prime factors
                </span>
                <span className="font-mono text-sm text-foreground">{factorization}</span>
              </div>
            </div>

            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                All divisors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.divisors.map((d) => (
                  <span
                    key={d}
                    className="rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      )}

      <p className="text-sm text-muted-foreground">
        Inspects a positive integer up to one billion: primality, parity, all
        divisors and the prime factorization. Runs locally.
      </p>
    </div>
  );
};

export default NumberProperties;
