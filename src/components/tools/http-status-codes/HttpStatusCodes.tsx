"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  searchStatuses,
  statusClass,
  STATUS_CLASS_LABELS,
  type StatusClass,
} from "./statuses";

const CLASSES: (StatusClass | "all")[] = ["all", "1xx", "2xx", "3xx", "4xx", "5xx"];

const HttpStatusCodes = () => {
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState<StatusClass | "all">("all");

  const results = useMemo(() => searchStatuses(query, cls), [query, cls]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, name or meaning…"
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        <div className="inline-flex flex-wrap rounded-lg border border-border p-1">
          {CLASSES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCls(c)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                cls === c
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="divide-y divide-border/60 rounded-lg border border-border">
          {results.map((s) => (
            <div
              key={s.code}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <div className="flex w-full items-baseline gap-3 sm:w-auto">
                <span className="font-mono text-lg font-medium text-accent">
                  {s.code}
                </span>
                <span className="font-display text-base tracking-tight text-foreground">
                  {s.name}
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60 sm:hidden">
                  {STATUS_CLASS_LABELS[statusClass(s.code)]}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:flex-1">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No status codes match “{query}”.
        </p>
      )}

      <p className="text-sm text-muted-foreground">
        A quick reference of common HTTP status codes grouped by class (1xx–5xx).
        Everything is bundled with the page — no requests are made.
      </p>
    </div>
  );
};

export default HttpStatusCodes;
