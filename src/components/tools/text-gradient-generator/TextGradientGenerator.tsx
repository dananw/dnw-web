"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_TEXT_GRADIENT,
  buildTextGradient,
  textGradientCss,
} from "./textGradient";

const TextGradientGenerator = () => {
  const [angle, setAngle] = useState(DEFAULT_TEXT_GRADIENT.angle);
  const [colors, setColors] = useState<string[]>(DEFAULT_TEXT_GRADIENT.colors);
  const [copied, setCopied] = useState(false);

  const cfg = useMemo(() => ({ angle, colors }), [angle, colors]);
  const gradient = useMemo(() => buildTextGradient(cfg), [cfg]);
  const css = useMemo(() => textGradientCss(cfg), [cfg]);

  const setColor = (i: number, value: string) =>
    setColors((c) => c.map((col, idx) => (idx === i ? value : col)));
  const addColor = () => setColors((c) => [...c, "#1a1a1a"]);
  const removeColor = (i: number) =>
    setColors((c) => (c.length <= 2 ? c : c.filter((_, idx) => idx !== i)));

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
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 px-4 py-12">
        <span
          className="bg-clip-text text-center font-display text-5xl font-bold tracking-tight text-transparent"
          style={{ backgroundImage: gradient }}
        >
          Gradient
        </span>
      </div>

      <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Angle
        <input
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="flex-1 accent-accent"
        />
        <span className="w-12 text-right text-foreground">{angle}°</span>
      </label>

      <div className="space-y-3">
        <span className="block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Colors
        </span>
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(i, e.target.value)}
              aria-label={`Color ${i + 1}`}
              className="h-10 w-12 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
            />
            <input
              value={color}
              onChange={(e) => setColor(i, e.target.value)}
              spellCheck={false}
              className="w-32 rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
            />
            <button
              type="button"
              onClick={() => removeColor(i)}
              disabled={colors.length <= 2}
              aria-label="Remove color"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button type="button" size="sm" variant="outline" onClick={addColor} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add color
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
        <pre className="overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground">
          {css}
        </pre>
      </div>

      <p className="text-sm text-muted-foreground">
        Uses <code className="text-foreground">background-clip: text</code> with a
        transparent color to paint the gradient onto the letters. Runs locally.
      </p>
    </div>
  );
};

export default TextGradientGenerator;
