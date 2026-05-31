"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_GRID, gridCss, type GridConfig } from "./grid";

const SLIDERS: { key: keyof GridConfig; label: string; min: number; max: number; unit?: string }[] = [
  { key: "columns", label: "Columns", min: 1, max: 12 },
  { key: "rows", label: "Rows", min: 1, max: 12 },
  { key: "columnGap", label: "Column gap", min: 0, max: 48, unit: "px" },
  { key: "rowGap", label: "Row gap", min: 0, max: 48, unit: "px" },
];

const GridGenerator = () => {
  const [cfg, setCfg] = useState<GridConfig>(DEFAULT_GRID);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => gridCss(cfg), [cfg]);
  const cells = Math.max(1, Math.min(cfg.columns, 12)) * Math.max(1, Math.min(cfg.rows, 12));

  const previewStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.min(cfg.columns, 12)}, 1fr)`,
    gridTemplateRows: `repeat(${Math.min(cfg.rows, 12)}, 1fr)`,
    columnGap: `${cfg.columnGap}px`,
    rowGap: `${cfg.rowGap}px`,
  };

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
      <div className="rounded-lg border border-border bg-muted/40 p-4" style={previewStyle}>
        {Array.from({ length: cells }, (_, i) => (
          <div key={i} className="flex h-10 items-center justify-center rounded bg-accent/20 font-mono text-xs text-accent">
            {i + 1}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <div key={s.key}>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={`grid-${s.key}`} className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </label>
              <span className="font-mono text-sm text-foreground">
                {cfg[s.key]}{s.unit ?? ""}
              </span>
            </div>
            <input
              id={`grid-${s.key}`}
              type="range"
              min={s.min}
              max={s.max}
              value={cfg[s.key]}
              onChange={(e) => setCfg((c) => ({ ...c, [s.key]: Number(e.target.value) }))}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">CSS</span>
          <Button type="button" size="sm" variant="outline" onClick={handleCopy} className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
            {copied ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
          </Button>
        </div>
        <pre className="overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground">
          {css}
        </pre>
      </div>

      <p className="text-sm text-muted-foreground">
        Builds an equal-track grid with <code className="text-foreground">repeat(n, 1fr)</code> and the
        gaps you choose. Runs locally.
      </p>
    </div>
  );
};

export default GridGenerator;
