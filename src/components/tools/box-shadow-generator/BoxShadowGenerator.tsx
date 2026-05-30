"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_SHADOW,
  buildBoxShadow,
  boxShadowCss,
  type ShadowConfig,
} from "./boxShadow";

interface SliderDef {
  key: "x" | "y" | "blur" | "spread" | "opacity";
  label: string;
  min: number;
  max: number;
  unit: string;
}

const SLIDERS: SliderDef[] = [
  { key: "x", label: "Offset X", min: -100, max: 100, unit: "px" },
  { key: "y", label: "Offset Y", min: -100, max: 100, unit: "px" },
  { key: "blur", label: "Blur", min: 0, max: 150, unit: "px" },
  { key: "spread", label: "Spread", min: -100, max: 100, unit: "px" },
  { key: "opacity", label: "Opacity", min: 0, max: 100, unit: "%" },
];

const BoxShadowGenerator = () => {
  const [cfg, setCfg] = useState<ShadowConfig>(DEFAULT_SHADOW);
  const [copied, setCopied] = useState(false);

  const shadow = useMemo(() => buildBoxShadow(cfg), [cfg]);
  const css = useMemo(() => boxShadowCss(cfg), [cfg]);

  const set = (key: keyof ShadowConfig, value: number | string | boolean) =>
    setCfg((c) => ({ ...c, [key]: value }));

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
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 py-16">
        <div
          className="h-32 w-32 rounded-lg bg-card"
          style={{ boxShadow: shadow }}
          aria-label="Box shadow preview"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <div key={s.key}>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={`shadow-${s.key}`}
                className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                {s.label}
              </label>
              <span className="font-mono text-sm text-foreground">
                {cfg[s.key]}
                {s.unit}
              </span>
            </div>
            <input
              id={`shadow-${s.key}`}
              type="range"
              min={s.min}
              max={s.max}
              value={cfg[s.key]}
              onChange={(e) => set(s.key, Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        ))}

        <div className="flex items-end gap-6">
          <div>
            <label
              htmlFor="shadow-color"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Color
            </label>
            <input
              id="shadow-color"
              type="color"
              value={cfg.color}
              onChange={(e) => set("color", e.target.value)}
              className="h-11 w-16 cursor-pointer rounded-lg border border-border bg-card"
            />
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 pb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <input
              type="checkbox"
              checked={cfg.inset}
              onChange={(e) => set("inset", e.target.checked)}
              className="h-3.5 w-3.5 accent-accent"
            />
            Inset
          </label>
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
          {css}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Adjust the sliders and the preview and CSS update live. The color picker
        and opacity combine into an <code className="text-foreground">rgba()</code>{" "}
        value. All local.
      </p>
    </div>
  );
};

export default BoxShadowGenerator;
