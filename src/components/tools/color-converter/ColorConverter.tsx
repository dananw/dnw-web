"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  parseRgb,
  parseHsl,
  type Rgb,
} from "./color";

const ColorConverter = () => {
  const [rgb, setRgb] = useState<Rgb>({ r: 234, g: 122, b: 24 });
  const [hexInput, setHexInput] = useState("#ea7a18");
  const [rgbInput, setRgbInput] = useState("234, 122, 24");
  const [hslInput, setHslInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const hsl = rgbToHsl(rgb);

  // Keep derived fields in sync but let the user keep typing in the one they edit.
  const sync = (next: Rgb, source: "hex" | "rgb" | "hsl") => {
    setRgb(next);
    if (source !== "hex") setHexInput(rgbToHex(next));
    if (source !== "rgb") setRgbInput(`${next.r}, ${next.g}, ${next.b}`);
    if (source !== "hsl") {
      const h = rgbToHsl(next);
      setHslInput(`${h.h}, ${h.s}%, ${h.l}%`);
    }
  };

  const onHex = (v: string) => {
    setHexInput(v);
    const parsed = hexToRgb(v);
    if (parsed) sync(parsed, "hex");
  };
  const onRgb = (v: string) => {
    setRgbInput(v);
    const parsed = parseRgb(v);
    if (parsed) sync(parsed, "rgb");
  };
  const onHsl = (v: string) => {
    setHslInput(v);
    const parsed = parseHsl(v);
    if (parsed) sync(hslToRgb(parsed), "hsl");
  };

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  const hex = rgbToHex(rgb);
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const fields: { key: string; label: string; value: string; onChange: (v: string) => void; copyValue: string }[] = [
    { key: "hex", label: "HEX", value: hexInput, onChange: onHex, copyValue: hex },
    { key: "rgb", label: "RGB", value: rgbInput, onChange: onRgb, copyValue: rgbStr },
    { key: "hsl", label: "HSL", value: hslInput, onChange: onHsl, copyValue: hslStr },
  ];

  return (
    <div className="space-y-6">
      <div
        className="h-40 w-full rounded-lg border border-border"
        style={{ backgroundColor: hex }}
        aria-label={`Color preview ${hex}`}
      />

      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`color-${f.key}`}
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {f.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                id={`color-${f.key}`}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                spellCheck={false}
                className="flex-1 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              />
              <button
                type="button"
                onClick={() => copy(f.key, f.copyValue)}
                aria-label={`Copy ${f.label}`}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                {copied === f.key ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Edit any format and the others update live. Accepts <code className="text-foreground">#abc</code>,
        <code className="text-foreground"> #aabbcc</code>, and comma-separated RGB/HSL. All local.
      </p>
    </div>
  );
};

export default ColorConverter;
