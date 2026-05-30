"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Calendar } from "lucide-react";
import { explainCron } from "./cron";

const PRESETS = [
  { expr: "*/5 * * * *", label: "Every 5 min" },
  { expr: "0 9 * * 1-5", label: "Weekdays 9am" },
  { expr: "0 0 1 * *", label: "Monthly" },
  { expr: "30 3 * * 0", label: "Sun 3:30am" },
];

const CronExplainer = () => {
  const [expr, setExpr] = useState("*/5 * * * *");
  const result = useMemo(() => explainCron(expr), [expr]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="cron-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Cron expression
        </label>
        <input
          id="cron-input"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          placeholder="* * * * *"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-base text-foreground outline-none transition-colors focus:border-accent/60"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.expr}
              type="button"
              onClick={() => setExpr(p.expr)}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {result.ok ? (
        <>
          <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
              Meaning
            </p>
            <p className="mt-2 text-lg leading-relaxed text-foreground">
              {result.description}
            </p>
          </div>

          {result.nextRuns && result.nextRuns.length > 0 && (
            <div>
              <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Next runs
              </p>
              <div className="divide-y divide-border/60 rounded-lg border border-border">
                {result.nextRuns.map((run, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 font-mono text-sm text-foreground"
                  >
                    {run}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Standard 5-field cron (minute, hour, day-of-month, month, day-of-week).
        Next run times are computed in your local timezone. Special strings like
        <code className="text-foreground"> @daily </code> aren&apos;t supported.
      </p>
    </div>
  );
};

export default CronExplainer;
