"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BEZIER_PRESETS,
  DEFAULT_BEZIER,
  bezierCss,
  bezierPath,
  type BezierConfig,
} from "./cubicBezier";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const CubicBezier = () => {
  const [cfg, setCfg] = useState<BezierConfig>(DEFAULT_BEZIER);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => bezierCss(cfg), [cfg]);
  const path = useMemo(() => bezierPath(cfg, 100), [cfg]);

  const set = (key: keyof BezierConfig, value: number) => {
    const v = key === "x1" || key === "x2" ? clamp01(value) : value;
    setCfg((c) => ({ ...c, [key]: Number.isFinite(v) ? v : 0 }));
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
      <style>{`@keyframes tool-bezier-demo { from { left: 0 } to { left: calc(100% - 1.25rem) } }`}</style>

      <div className="flex flex-wrap gap-2">
        {BEZIER_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setCfg(p.cfg)}
            className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs lowercase tracking-[0.06em] text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 p-4">
          <svg viewBox="-10 -10 120 120" className="h-44 w-44">
            <line x1="0" y1="100" x2="100" y2="100" className="stroke-border" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="100" className="stroke-border" strokeWidth="1" />
            <line
              x1="0"
              y1="100"
              x2={cfg.x1 * 100}
              y2={100 - cfg.y1 * 100}
              className="stroke-accent/40"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="0"
              x2={cfg.x2 * 100}
              y2={100 - cfg.y2 * 100}
              className="stroke-accent/40"
              strokeWidth="1"
            />
            <path d={path} className="fill-none stroke-accent" strokeWidth="2.5" />
            <circle cx={cfg.x1 * 100} cy={100 - cfg.y1 * 100} r="3.5" className="fill-accent" />
            <circle cx={cfg.x2 * 100} cy={100 - cfg.y2 * 100} r="3.5" className="fill-accent" />
          </svg>
        </div>

        <div className="space-y-4">
          {(
            [
              { key: "x1", label: "x1" },
              { key: "y1", label: "y1" },
              { key: "x2", label: "x2" },
              { key: "y2", label: "y2" },
            ] as { key: keyof BezierConfig; label: string }[]
          ).map((f) => (
            <div key={f.key} className="flex items-center gap-3">
              <label
                htmlFor={`bz-${f.key}`}
                className="w-8 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
              >
                {f.label}
              </label>
              <input
                id={`bz-${f.key}`}
                type="number"
                step={0.01}
                value={cfg[f.key]}
                onChange={(e) => set(f.key, Number(e.target.value))}
                className="w-24 rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-accent/60"
              />
            </div>
          ))}
          <div className="relative h-5 w-full rounded-full bg-muted">
            <span
              className="absolute top-0 h-5 w-5 rounded-full bg-accent"
              style={{ animation: "tool-bezier-demo 1.6s infinite alternate", animationTimingFunction: css }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            CSS
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
          transition-timing-function: {css};
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        The X values are clamped to 0–1 (a CSS requirement); Y can overshoot for
        bouncy curves. The dot above previews the easing live. Runs locally.
      </p>
    </div>
  );
};

export default CubicBezier;
