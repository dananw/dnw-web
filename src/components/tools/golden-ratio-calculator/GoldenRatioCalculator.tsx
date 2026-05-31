"use client";

import { useMemo, useState } from "react";
import { goldenFrom, type GoldenMode } from "./goldenRatio";

const MODES: { value: GoldenMode; label: string }[] = [
  { value: "whole", label: "Whole" },
  { value: "longer", label: "Longer part" },
  { value: "shorter", label: "Shorter part" },
];

const GoldenRatioCalculator = () => {
  const [value, setValue] = useState("960");
  const [mode, setMode] = useState<GoldenMode>("whole");

  const result = useMemo(() => goldenFrom(Number(value), mode), [value, mode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="golden-value"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Value
          </label>
          <input
            id="golden-value"
            type="number"
            min={0}
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-40 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div className="inline-flex rounded-lg border border-border p-1">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              aria-pressed={mode === m.value}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                mode === m.value
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {result ? (
        <>
          <div className="flex h-10 overflow-hidden rounded-lg border border-border">
            <div
              className="flex items-center justify-center bg-accent/20 font-mono text-xs text-foreground"
              style={{ width: `${(result.longer / result.whole) * 100}%` }}
            >
              {result.longer}
            </div>
            <div className="flex flex-1 items-center justify-center bg-muted font-mono text-xs text-muted-foreground">
              {result.shorter}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Whole", value: result.whole },
              { label: "Longer (a)", value: result.longer },
              { label: "Shorter (b)", value: result.shorter },
            ].map((r) => (
              <div key={r.label} className="rounded-lg border border-border px-4 py-3 text-center">
                <div className="font-mono text-xl text-foreground">{r.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a positive number.</p>
      )}

      <p className="text-sm text-muted-foreground">
        The golden ratio (φ ≈ 1.618) splits a length so the whole is to the
        longer part as the longer is to the shorter. Handy for balanced layouts
        and type scales. Runs locally.
      </p>
    </div>
  );
};

export default GoldenRatioCalculator;
