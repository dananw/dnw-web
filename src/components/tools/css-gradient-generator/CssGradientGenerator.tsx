"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_GRADIENT,
  buildGradient,
  gradientCss,
  newStopId,
  type GradientConfig,
  type GradientType,
} from "./gradient";

const CssGradientGenerator = () => {
  const [cfg, setCfg] = useState<GradientConfig>(DEFAULT_GRADIENT);
  const [copied, setCopied] = useState(false);

  const gradient = useMemo(() => buildGradient(cfg), [cfg]);
  const css = useMemo(() => gradientCss(cfg), [cfg]);

  const setType = (type: GradientType) => setCfg((c) => ({ ...c, type }));

  const updateStop = (id: string, key: "color" | "position", value: string) =>
    setCfg((c) => ({
      ...c,
      stops: c.stops.map((s) =>
        s.id === id
          ? { ...s, [key]: key === "position" ? Number(value) : value }
          : s
      ),
    }));

  const addStop = () =>
    setCfg((c) => ({
      ...c,
      stops: [...c.stops, { id: newStopId(), color: "#888888", position: 50 }],
    }));

  const removeStop = (id: string) =>
    setCfg((c) =>
      c.stops.length <= 2
        ? c
        : { ...c, stops: c.stops.filter((s) => s.id !== id) }
    );

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
        className="h-44 w-full rounded-lg border border-border"
        style={{ background: gradient }}
        aria-label="Gradient preview"
      />

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {(["linear", "radial"] as GradientType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] capitalize transition-colors ${
                cfg.type === t
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {cfg.type === "linear" && (
          <label className="inline-flex flex-1 items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Angle
            <input
              type="range"
              min={0}
              max={360}
              value={cfg.angle}
              onChange={(e) =>
                setCfg((c) => ({ ...c, angle: Number(e.target.value) }))
              }
              className="flex-1 accent-accent"
            />
            <span className="w-12 text-right text-foreground">{cfg.angle}°</span>
          </label>
        )}
      </div>

      <div className="space-y-3">
        <span className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Color stops
        </span>
        {cfg.stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-3">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(stop.id, "color", e.target.value)}
              aria-label="Stop color"
              className="h-10 w-12 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
            />
            <input
              value={stop.color}
              onChange={(e) => updateStop(stop.id, "color", e.target.value)}
              spellCheck={false}
              className="w-28 rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
            />
            <label className="flex flex-1 items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <input
                type="range"
                min={0}
                max={100}
                value={stop.position}
                onChange={(e) => updateStop(stop.id, "position", e.target.value)}
                className="flex-1 accent-accent"
              />
              <span className="w-10 text-right text-foreground">
                {stop.position}%
              </span>
            </label>
            <button
              type="button"
              onClick={() => removeStop(stop.id)}
              disabled={cfg.stops.length <= 2}
              aria-label="Remove stop"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addStop}
          className="gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" /> Add stop
        </Button>
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
        <div className="break-all rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
          {css}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Add as many color stops as you like and drag their positions. Stops are
        sorted automatically when the CSS is built. Everything runs locally.
      </p>
    </div>
  );
};

export default CssGradientGenerator;
