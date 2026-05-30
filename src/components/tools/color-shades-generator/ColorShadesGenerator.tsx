"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { generateShades, parseHex } from "./shades";

const ColorShadesGenerator = () => {
  const [hex, setHex] = useState("#ea7a18");
  const [copied, setCopied] = useState<string | null>(null);

  const valid = useMemo(() => parseHex(hex) !== null, [hex]);
  const shades = useMemo(() => (valid ? generateShades(hex) : []), [hex, valid]);

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
          value={valid ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          aria-label="Base color"
          className="h-11 w-16 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-card"
        />
        <div className="flex-1">
          <label
            htmlFor="shades-hex"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Base color
          </label>
          <input
            id="shades-hex"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            spellCheck={false}
            className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
              valid ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
      </div>

      {shades.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {shades.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => copy(s.hex)}
              className={`group flex flex-col overflow-hidden rounded-lg border text-left transition-colors ${
                s.isBase ? "border-accent" : "border-border hover:border-accent/60"
              }`}
            >
              <span className="h-16 w-full" style={{ backgroundColor: s.hex }} />
              <span className="flex items-center justify-between gap-1 px-2.5 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {s.label}
                </span>
                {copied === s.hex ? (
                  <Check className="h-3 w-3 text-accent" />
                ) : (
                  <span className="font-mono text-[11px] uppercase text-foreground">
                    {s.hex.replace("#", "")}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Your base color sits at <code className="text-foreground">500</code>;
        lighter tints run toward white and darker shades toward black. Click any
        swatch to copy its HEX. Runs locally.
      </p>
    </div>
  );
};

export default ColorShadesGenerator;
