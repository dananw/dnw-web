"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_NEU, neuCss, neuStyle, type NeuConfig, type NeuShape } from "./neumorphism";

const SLIDERS: { key: keyof NeuConfig; label: string; min: number; max: number; step?: number }[] = [
  { key: "size", label: "Size", min: 100, max: 280 },
  { key: "radius", label: "Radius", min: 0, max: 100 },
  { key: "distance", label: "Distance", min: 2, max: 40 },
  { key: "blur", label: "Blur", min: 0, max: 80 },
  { key: "intensity", label: "Intensity", min: 0.05, max: 0.5, step: 0.01 },
];

const NeumorphismGenerator = () => {
  const [cfg, setCfg] = useState<NeuConfig>(DEFAULT_NEU);
  const [copied, setCopied] = useState(false);

  const style = useMemo(() => neuStyle(cfg) as CSSProperties, [cfg]);
  const css = useMemo(() => neuCss(cfg), [cfg]);

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
      <div
        className="flex items-center justify-center rounded-lg border border-border p-10"
        style={{ background: cfg.color }}
      >
        <div
          style={{ ...style, width: `${cfg.size}px`, height: `${cfg.size}px`, maxWidth: "100%" }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="neu-color" className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Base color</span>
          <input
            id="neu-color"
            type="color"
            value={cfg.color}
            onChange={(e) => setCfg((c) => ({ ...c, color: e.target.value }))}
            className="h-10 w-16 cursor-pointer rounded-lg border border-border bg-card"
          />
        </label>
        <div className="inline-flex self-end rounded-lg border border-border p-1">
          {(["flat", "concave", "convex"] as NeuShape[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setCfg((c) => ({ ...c, shape: s }))}
              aria-pressed={cfg.shape === s}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase capitalize tracking-[0.12em] transition-colors ${
                cfg.shape === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <div key={s.key}>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={`neu-${s.key}`} className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </label>
              <span className="font-mono text-sm text-foreground">{cfg[s.key]}</span>
            </div>
            <input
              id={`neu-${s.key}`}
              type="range"
              min={s.min}
              max={s.max}
              step={s.step ?? 1}
              value={cfg[s.key] as number}
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
        Soft UI uses two shadows — a darker one and a lighter one derived from the
        base color — on the same background. Runs locally.
      </p>
    </div>
  );
};

export default NeumorphismGenerator;
