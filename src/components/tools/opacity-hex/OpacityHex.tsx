"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildHex8, percentToHexAlpha } from "./opacityHex";

const OpacityHex = () => {
  const [color, setColor] = useState("#ea7a18");
  const [opacity, setOpacity] = useState(50);
  const [copied, setCopied] = useState(false);

  const alpha = useMemo(() => percentToHexAlpha(opacity), [opacity]);
  const hex8 = useMemo(() => buildHex8(color, opacity) ?? "—", [color, opacity]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex8);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="flex h-28 items-center justify-center rounded-lg border border-border"
        style={{
          backgroundImage:
            "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
        }}
      >
        <span
          className="flex h-20 w-40 items-center justify-center rounded-lg font-mono text-sm text-foreground"
          style={{ backgroundColor: hex8 }}
        >
          {hex8}
        </span>
      </div>

      <div className="flex items-end gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Base color"
          className="h-11 w-16 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
        />
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="opacity-range"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Opacity
            </label>
            <span className="font-mono text-sm text-foreground">
              {opacity}% · {alpha}
            </span>
          </div>
          <input
            id="opacity-range"
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          8-digit hex
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-foreground">{hex8}</span>
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
      </div>

      <p className="text-sm text-muted-foreground">
        Maps an opacity percentage to the two-digit alpha channel used in 8-digit
        hex colors (<code className="text-foreground">#RRGGBBAA</code>). Runs
        locally.
      </p>
    </div>
  );
};

export default OpacityHex;
