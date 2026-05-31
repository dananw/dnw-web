"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { COMMON_ZONES, convertAcrossZones } from "./timezones";

const localGuess = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

const TimezoneConverter = () => {
  const [datetime, setDatetime] = useState("2026-06-01T12:00");
  const [source, setSource] = useState(localGuess());

  const zones = useMemo(() => [...new Set<string>([source, ...COMMON_ZONES])], [source]);

  const result = useMemo(
    () => convertAcrossZones(datetime, source, zones),
    [datetime, source, zones]
  );

  const sourceOptions = useMemo(
    () => [...new Set<string>([source, ...COMMON_ZONES])],
    [source]
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tz-datetime" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Date & time
          </label>
          <input
            id="tz-datetime"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="tz-source" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            In time zone
          </label>
          <select
            id="tz-source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {sourceOptions.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="divide-y divide-border/60 rounded-lg border border-border">
          {result.times.map((t) => (
            <div
              key={t.zone}
              className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                t.zone === source ? "bg-muted/30" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate font-mono text-sm text-foreground">{t.zone}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t.offset}</span>
              </span>
              <span className="text-right font-mono text-sm text-foreground">{t.formatted}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Reads the chosen wall-clock time as being in the source zone, then shows
        that same instant everywhere else, using your browser&apos;s IANA time
        zone data. Runs locally.
      </p>
    </div>
  );
};

export default TimezoneConverter;
