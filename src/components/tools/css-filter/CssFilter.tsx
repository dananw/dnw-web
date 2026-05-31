"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_FILTER, FILTERS, buildFilter, filterCss, type FilterConfig } from "./cssFilter";

const CssFilter = () => {
  const [cfg, setCfg] = useState<FilterConfig>(DEFAULT_FILTER);
  const [copied, setCopied] = useState(false);

  const filter = useMemo(() => buildFilter(cfg), [cfg]);
  const css = useMemo(() => filterCss(cfg), [cfg]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 p-6">
        <div
          className="h-40 w-full max-w-sm rounded-lg"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ea7a18, #7c3aed 50%, #0ea5e9)",
            filter,
          }}
          aria-label="Filter preview"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {FILTERS.map((f) => (
          <div key={f.key}>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={`filter-${f.key}`} className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {f.label}
              </label>
              <span className="font-mono text-sm text-foreground">
                {cfg[f.key]}
                {f.unit}
              </span>
            </div>
            <input
              id={`filter-${f.key}`}
              type="range"
              min={f.min}
              max={f.max}
              value={cfg[f.key]}
              onChange={(e) => setCfg((c) => ({ ...c, [f.key]: Number(e.target.value) }))}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setCfg(DEFAULT_FILTER)}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={handleCopy} className="h-9 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
          {copied ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
        </Button>
      </div>

      <div className="break-all rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
        {css}
      </div>

      <p className="text-sm text-muted-foreground">
        Combine multiple CSS filter functions into one declaration; only the
        values you change from their defaults are included. Runs locally.
      </p>
    </div>
  );
};

export default CssFilter;
