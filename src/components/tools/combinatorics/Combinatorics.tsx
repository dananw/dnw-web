"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { combinatorics } from "./combinatorics";

const Combinatorics = () => {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");

  const result = useMemo(() => combinatorics(n, r), [n, r]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">n (total)</span>
          <input
            type="number"
            min={0}
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">r (chosen)</span>
          <input
            type="number"
            min={0}
            value={r}
            onChange={(e) => setR(e.target.value)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        result.permutations && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border px-4 py-5 text-center">
              <div className="break-all font-display text-2xl tracking-tight text-foreground">
                {result.permutations}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Permutations (nPr)
              </div>
            </div>
            <div className="rounded-lg border border-border px-4 py-5 text-center">
              <div className="break-all font-display text-2xl tracking-tight text-foreground">
                {result.combinations}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Combinations (nCr)
              </div>
            </div>
          </div>
        )
      )}

      <p className="text-sm text-muted-foreground">
        Permutations count ordered selections; combinations count unordered ones.
        Big integers keep even huge results exact. Runs locally.
      </p>
    </div>
  );
};

export default Combinatorics;
