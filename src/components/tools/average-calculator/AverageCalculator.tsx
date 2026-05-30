"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { computeStats } from "./stats";

const AverageCalculator = () => {
  const [input, setInput] = useState("4, 8, 15, 16, 23, 42");
  const result = useMemo(() => computeStats(input), [input]);

  const stats = result.ok
    ? [
        { label: "Count", value: String(result.count) },
        { label: "Sum", value: result.sum },
        { label: "Mean", value: result.mean },
        { label: "Median", value: result.median },
        { label: "Mode", value: result.mode },
        { label: "Min", value: result.min },
        { label: "Max", value: result.max },
        { label: "Range", value: result.range },
        { label: "Std dev", value: result.stdDev },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="stats-input" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Numbers
        </label>
        <textarea
          id="stats-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Separate with commas, spaces or new lines"
          className={`h-28 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
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
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-4 py-3 text-center">
              <div className="truncate font-mono text-lg text-foreground">{s.value}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Standard deviation is the population value (divided by n). Mode shows the
        most frequent value(s), or a dash when all are unique. Runs locally.
      </p>
    </div>
  );
};

export default AverageCalculator;
