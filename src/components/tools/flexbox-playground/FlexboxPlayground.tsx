"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_FLEX, FLEX_OPTIONS, flexCss, type FlexConfig } from "./flexbox";

const CONTROLS: { key: keyof typeof FLEX_OPTIONS; label: string }[] = [
  { key: "direction", label: "Direction" },
  { key: "justify", label: "Justify content" },
  { key: "align", label: "Align items" },
  { key: "wrap", label: "Wrap" },
];

const FlexboxPlayground = () => {
  const [cfg, setCfg] = useState<FlexConfig>(DEFAULT_FLEX);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => flexCss(cfg), [cfg]);
  const previewStyle: CSSProperties = {
    display: "flex",
    flexDirection: cfg.direction as CSSProperties["flexDirection"],
    justifyContent: cfg.justify,
    alignItems: cfg.align as CSSProperties["alignItems"],
    flexWrap: cfg.wrap as CSSProperties["flexWrap"],
    gap: `${cfg.gap}px`,
  };

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
      <div className="min-h-[10rem] rounded-lg border border-border bg-muted/40 p-4" style={previewStyle}>
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="flex w-14 items-center justify-center rounded-lg bg-accent/20 font-mono text-sm text-accent"
            style={{ height: `${40 + n * 8}px` }}
          >
            {n}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTROLS.map((ctrl) => (
          <label key={ctrl.key} className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span className="mb-2 block">{ctrl.label}</span>
            <select
              value={cfg[ctrl.key]}
              onChange={(e) => setCfg((c) => ({ ...c, [ctrl.key]: e.target.value }))}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-accent/60"
            >
              {FLEX_OPTIONS[ctrl.key].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label className="block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground sm:col-span-2">
          <span className="mb-2 flex items-center justify-between">
            <span>Gap</span>
            <span className="text-foreground">{cfg.gap}px</span>
          </span>
          <input
            type="range"
            min={0}
            max={48}
            value={cfg.gap}
            onChange={(e) => setCfg((c) => ({ ...c, gap: Number(e.target.value) }))}
            className="w-full accent-accent"
          />
        </label>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">CSS</span>
          <Button type="button" size="sm" variant="outline" onClick={handleCopy} className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
            {copied ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
          </Button>
        </div>
        <pre className="overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground">
          {css}
        </pre>
      </div>

      <p className="text-sm text-muted-foreground">
        Tweak the container properties and watch the items rearrange, then copy
        the CSS. Runs locally.
      </p>
    </div>
  );
};

export default FlexboxPlayground;
