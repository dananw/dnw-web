"use client";

import { useState } from "react";
import {
  PRESETS,
  simplifyRatio,
  solveHeight,
  solveWidth,
  formatRatio,
  type Ratio,
} from "./aspectRatio";

const num = (v: string): number => (v === "" ? NaN : Number(v));

const AspectRatioCalculator = () => {
  const [ratio, setRatio] = useState<Ratio>({ w: 16, h: 9 });
  const [width, setWidth] = useState("1280");
  const [height, setHeight] = useState("720");

  const applyRatio = (next: Ratio) => {
    setRatio(next);
    const w = num(width);
    if (Number.isFinite(w)) {
      const h = solveHeight(next, w);
      if (h !== null) setHeight(String(h));
    }
  };

  const onRatioW = (v: string) => applyRatio({ ...ratio, w: Number(v) || 0 });
  const onRatioH = (v: string) => applyRatio({ ...ratio, h: Number(v) || 0 });

  const onWidth = (v: string) => {
    setWidth(v);
    const w = num(v);
    if (Number.isFinite(w)) {
      const h = solveHeight(ratio, w);
      if (h !== null) setHeight(String(h));
    }
  };

  const onHeight = (v: string) => {
    setHeight(v);
    const h = num(v);
    if (Number.isFinite(h)) {
      const w = solveWidth(ratio, h);
      if (w !== null) setWidth(String(w));
    }
  };

  const simplified = simplifyRatio(num(width), num(height));

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = ratio.w === p.ratio.w && ratio.h === p.ratio.h;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => applyRatio(p.ratio)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Aspect ratio
        </span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={ratio.w || ""}
            onChange={(e) => onRatioW(e.target.value)}
            aria-label="Ratio width"
            className="w-24 rounded-lg border border-border bg-card px-4 py-3 text-center font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
          <span className="font-mono text-lg text-muted-foreground">:</span>
          <input
            type="number"
            min={1}
            value={ratio.h || ""}
            onChange={(e) => onRatioH(e.target.value)}
            aria-label="Ratio height"
            className="w-24 rounded-lg border border-border bg-card px-4 py-3 text-center font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label
            htmlFor="ar-width"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Width (px)
          </label>
          <input
            id="ar-width"
            type="number"
            step="any"
            value={width}
            onChange={(e) => onWidth(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <span className="hidden pb-3 text-center font-mono text-muted-foreground sm:block">
          ×
        </span>
        <div>
          <label
            htmlFor="ar-height"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Height (px)
          </label>
          <input
            id="ar-height"
            type="number"
            step="any"
            value={height}
            onChange={(e) => onHeight(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Simplified ratio
        </span>
        <span className="font-mono text-sm text-foreground">
          {formatRatio(simplified)}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        Set a ratio (or pick a preset) and change either dimension — the other
        updates to keep the proportion. The simplified ratio reflects the values
        you typed. All local.
      </p>
    </div>
  );
};

export default AspectRatioCalculator;
