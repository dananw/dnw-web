"use client";

import { useMemo, useState } from "react";
import { nearestColorName } from "./colorName";

const ColorName = () => {
  const [hex, setHex] = useState("#3b82f6");
  const result = useMemo(() => nearestColorName(hex), [hex]);

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-3">
        <input
          type="color"
          value={result ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          aria-label="Color"
          className="h-11 w-16 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
        />
        <div className="flex-1">
          <label
            htmlFor="cn-hex"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            HEX color
          </label>
          <input
            id="cn-hex"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            spellCheck={false}
            className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
              result ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
      </div>

      {result && (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex h-28">
            <div className="flex-1" style={{ backgroundColor: hex }} aria-label="Your color" />
            <div className="flex-1" style={{ backgroundColor: result.hex }} aria-label="Nearest named color" />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div>
              <div className="font-display text-2xl tracking-tight text-foreground">
                {result.name}
              </div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">
                {result.hex}
                {result.exact ? " · exact match" : ` · ~${result.distance} away`}
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Finds the closest CSS named color by RGB distance. An exact match is
        flagged; otherwise you get the nearest neighbour. Runs locally.
      </p>
    </div>
  );
};

export default ColorName;
