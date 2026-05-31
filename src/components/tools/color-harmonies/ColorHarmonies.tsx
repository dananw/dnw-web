"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { generateHarmonies } from "./harmonies";

const ColorHarmonies = () => {
  const [hex, setHex] = useState("#ea7a18");
  const [copied, setCopied] = useState<string | null>(null);

  const harmonies = useMemo(() => generateHarmonies(hex), [hex]);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-3">
        <input
          type="color"
          value={harmonies ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          aria-label="Base color"
          className="h-11 w-16 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
        />
        <div className="flex-1">
          <label
            htmlFor="harm-hex"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Base color
          </label>
          <input
            id="harm-hex"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            spellCheck={false}
            className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
              harmonies ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
      </div>

      {harmonies && (
        <div className="space-y-5">
          {harmonies.map((h) => (
            <div key={h.name}>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {h.name}
              </div>
              <div className="flex overflow-hidden rounded-lg border border-border">
                {h.colors.map((c, i) => (
                  <button
                    key={`${c}-${i}`}
                    type="button"
                    onClick={() => copy(c)}
                    className="group relative flex h-20 flex-1 items-end justify-center pb-2"
                    style={{ backgroundColor: c }}
                    aria-label={`Copy ${c}`}
                  >
                    <span className="rounded bg-background/85 px-1.5 py-0.5 font-mono text-[10px] uppercase text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {copied === c ? <Check className="inline h-3 w-3 text-accent" /> : c.replace("#", "")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Rotates the base hue around the color wheel to build classic palettes.
        Hover a swatch and click to copy its HEX. Runs locally.
      </p>
    </div>
  );
};

export default ColorHarmonies;
