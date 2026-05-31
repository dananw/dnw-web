"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_TEXT_SHADOW,
  buildTextShadow,
  textShadowCss,
  type TextShadowConfig,
} from "./textShadow";

interface SliderDef {
  key: "x" | "y" | "blur" | "opacity";
  label: string;
  min: number;
  max: number;
  unit: string;
}

const SLIDERS: SliderDef[] = [
  { key: "x", label: "Offset X", min: -50, max: 50, unit: "px" },
  { key: "y", label: "Offset Y", min: -50, max: 50, unit: "px" },
  { key: "blur", label: "Blur", min: 0, max: 50, unit: "px" },
  { key: "opacity", label: "Opacity", min: 0, max: 100, unit: "%" },
];

const TextShadowGenerator = () => {
  const [cfg, setCfg] = useState<TextShadowConfig>(DEFAULT_TEXT_SHADOW);
  const [copied, setCopied] = useState(false);

  const shadow = useMemo(() => buildTextShadow(cfg), [cfg]);
  const css = useMemo(() => textShadowCss(cfg), [cfg]);

  const set = (key: keyof TextShadowConfig, value: number | string) =>
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
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 py-14">
        <span
          className="font-display text-5xl font-semibold tracking-tight text-foreground"
          style={{ textShadow: shadow }}
        >
          Aa Bb Cc
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <div key={s.key}>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={`textshadow-${s.key}`}
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
              id={`textshadow-${s.key}`}
              type="range"
              min={s.min}
              max={s.max}
              value={cfg[s.key]}
              onChange={(e) => set(s.key, Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="textshadow-color"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Color
          </label>
          <input
            id="textshadow-color"
            type="color"
            value={cfg.color}
            onChange={(e) => set("color", e.target.value)}
            className="h-11 w-16 cursor-pointer rounded-lg border border-border bg-card"
          />
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
        Adjust offset, blur and color, then copy the CSS text-shadow. The color
        picker and opacity combine into an{" "}
        <code className="text-foreground">rgba()</code> value. Runs locally.
      </p>
    </div>
  );
};

export default TextShadowGenerator;
