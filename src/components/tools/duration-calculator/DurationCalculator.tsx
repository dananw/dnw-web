"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { duration } from "./duration";

const DurationCalculator = () => {
  const [start, setStart] = useState("2026-01-01T09:00");
  const [end, setEnd] = useState("2026-01-08T17:30");

  const result = useMemo(() => duration(start, end), [start, end]);

  const totals = result.ok
    ? [
        { label: "Total hours", value: result.totalHours.toLocaleString("en-US") },
        { label: "Total minutes", value: result.totalMinutes.toLocaleString("en-US") },
        { label: "Total seconds", value: result.totalSeconds.toLocaleString("en-US") },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dur-start" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Start
          </label>
          <input
            id="dur-start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="dur-end" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            End
          </label>
          <input
            id="dur-end"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
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
        <>
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-5 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Duration</span>
            <p className="mt-2 font-display text-2xl tracking-tight text-foreground">
              {result.days}d {result.hours}h {result.minutes}m {result.seconds}s
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {totals.map((t) => (
              <div key={t.label} className="rounded-lg border border-border px-4 py-3 text-center">
                <div className="font-mono text-lg text-foreground">{t.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{t.label}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Measures the exact span between two moments, broken down and as totals.
        Order doesn&apos;t matter. Runs locally.
      </p>
    </div>
  );
};

export default DurationCalculator;
