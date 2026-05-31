"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { dateDifference } from "./dateDiff";

const DateDifference = () => {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2026-05-30");

  const diff = useMemo(() => dateDifference(start, end), [start, end]);

  const totals = diff.ok
    ? [
        { label: "Total days", value: diff.totalDays.toLocaleString("en-US") },
        { label: "Total weeks", value: diff.totalWeeks.toLocaleString("en-US") },
        { label: "Total hours", value: diff.totalHours.toLocaleString("en-US") },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="date-start"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Start date
          </label>
          <input
            id="date-start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="date-end"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            End date
          </label>
          <input
            id="date-end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      {!diff.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{diff.error}</span>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-5 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Difference
            </span>
            <p className="mt-2 font-display text-2xl tracking-tight text-foreground">
              {diff.years > 0 && `${diff.years} year${diff.years === 1 ? "" : "s"}, `}
              {diff.months} month{diff.months === 1 ? "" : "s"}, {diff.days} day
              {diff.days === 1 ? "" : "s"}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {totals.map((t) => (
              <div
                key={t.label}
                className="rounded-lg border border-border px-4 py-3 text-center"
              >
                <div className="font-mono text-xl text-foreground">{t.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        The order of the dates doesn&apos;t matter. The breakdown is
        calendar-aware (months and leap years vary in length). Runs locally.
      </p>
    </div>
  );
};

export default DateDifference;
