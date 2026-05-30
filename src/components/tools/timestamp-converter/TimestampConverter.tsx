"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fromUnix,
  fromDateString,
  nowViews,
  type TimestampViews,
} from "./timestamp";

type Mode = "unix" | "date";

const TimestampConverter = () => {
  const [mode, setMode] = useState<Mode>("unix");
  const [value, setValue] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Seed with the current timestamp on mount.
  useEffect(() => {
    setValue(String(Math.floor(Date.now() / 1000)));
  }, []);

  const views: TimestampViews | null = useMemo(() => {
    if (!value.trim()) return null;
    return mode === "unix" ? fromUnix(value) : fromDateString(value);
  }, [value, mode]);

  const useNow = () => {
    const n = nowViews();
    if (mode === "unix") setValue(String(n.unixSeconds));
    else setValue(n.iso);
  };

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // ignore
    }
  };

  const rows: { key: string; label: string; value: string }[] = views
    ? [
        { key: "unixSeconds", label: "Unix (seconds)", value: String(views.unixSeconds) },
        { key: "unixMillis", label: "Unix (millis)", value: String(views.unixMillis) },
        { key: "local", label: "Local", value: views.local },
        { key: "utc", label: "UTC", value: views.utc },
        { key: "iso", label: "ISO 8601", value: views.iso },
        { key: "relative", label: "Relative", value: views.relative },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setMode("unix")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              mode === "unix"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            From Unix
          </button>
          <button
            type="button"
            onClick={() => setMode("date")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              mode === "date"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            From Date
          </button>
        </div>
        <Button size="sm" variant="outline" onClick={useNow} className="gap-1.5">
          <Clock className="h-3.5 w-3.5" /> Now
        </Button>
      </div>

      <div>
        <label
          htmlFor="ts-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          {mode === "unix" ? "Unix timestamp" : "Date string"}
        </label>
        <input
          id="ts-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          placeholder={
            mode === "unix" ? "e.g. 1700000000" : "e.g. 2024-01-15T10:30:00Z"
          }
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {value.trim() && !views && (
        <p className="text-sm text-destructive">
          Couldn&apos;t parse that {mode === "unix" ? "timestamp" : "date"}.
        </p>
      )}

      {views && (
        <div className="divide-y divide-border/60 rounded-lg border border-border">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {row.label}
                </p>
                <p className="mt-1 break-all font-mono text-sm text-foreground">
                  {row.value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copy(row.key, row.value)}
                aria-label={`Copy ${row.label}`}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                {copiedKey === row.key ? (
                  <Check className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Seconds vs milliseconds are detected automatically. Dates accept any
        format the browser understands, including ISO 8601. All local.
      </p>
    </div>
  );
};

export default TimestampConverter;
