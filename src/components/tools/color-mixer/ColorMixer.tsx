"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mixColors } from "./colorMix";

const ColorMixer = () => {
  const [colorA, setColorA] = useState("#ea7a18");
  const [colorB, setColorB] = useState("#1e3a8a");
  const [weight, setWeight] = useState(50);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => mixColors(colorA, colorB, weight / 100),
    [colorA, colorB, weight]
  );

  const handleCopy = async () => {
    if (!result.ok) return;
    try {
      await navigator.clipboard.writeText(result.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Color A</span>
          <input
            type="color"
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
            className="h-12 w-20 cursor-pointer rounded-lg border border-border bg-card"
          />
        </label>
        <label className="text-right font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Color B</span>
          <input
            type="color"
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
            className="h-12 w-20 cursor-pointer rounded-lg border border-border bg-card"
          />
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="mix-weight" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Mix
          </label>
          <span className="font-mono text-sm text-foreground">{weight}% B</span>
        </div>
        <input
          id="mix-weight"
          type="range"
          min={0}
          max={100}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {result.ok && (
        <div
          className="flex items-center justify-between rounded-lg border border-border px-5 py-6"
          style={{ backgroundColor: result.hex }}
        >
          <span className="rounded-md bg-background/85 px-3 py-1.5 font-mono text-sm text-foreground">
            {result.hex} · {result.rgb}
          </span>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCopy}
            aria-label="Copy mixed color"
            className="bg-background/85"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Linearly blends the two colors in RGB space at the chosen ratio. Drag to
        0% for pure A or 100% for pure B. Runs locally.
      </p>
    </div>
  );
};

export default ColorMixer;
