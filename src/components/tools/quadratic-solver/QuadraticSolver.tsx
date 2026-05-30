"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { solveQuadratic } from "./quadratic";

const QuadraticSolver = () => {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-3");
  const [c, setC] = useState("2");

  const result = useMemo(
    () => solveQuadratic(Number(a), Number(b), Number(c)),
    [a, b, c]
  );

  const field = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void
  ) => (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-20 rounded-lg border border-border bg-card px-3 py-2.5 text-center font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
      />
      <span className="font-mono text-sm text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {field("quad-a", "x² +", a, setA)}
        {field("quad-b", "x +", b, setB)}
        {field("quad-c", "= 0", c, setC)}
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {result.nature}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              Δ = {Number(result.discriminant.toFixed(4))}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {result.roots.map((root, i) => (
              <div key={i} className="rounded-lg border border-border px-4 py-4 text-center">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  x{result.roots.length > 1 ? <sub>{i + 1}</sub> : ""}
                </div>
                <div className="mt-1 font-display text-2xl tracking-tight text-foreground">{root}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Solves ax² + bx + c = 0. The discriminant (Δ = b² − 4ac) decides whether
        the roots are real, repeated or complex. Runs locally.
      </p>
    </div>
  );
};

export default QuadraticSolver;
