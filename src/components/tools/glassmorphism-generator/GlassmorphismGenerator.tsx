"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_GLASS, glassCss, glassStyle, type GlassConfig } from "./glass";

const GlassmorphismGenerator = () => {
  const [cfg, setCfg] = useState<GlassConfig>(DEFAULT_GLASS);
  const [copied, setCopied] = useState(false);

  const style = useMemo(() => glassStyle(cfg) as CSSProperties, [cfg]);
  const css = useMemo(() => glassCss(cfg), [cfg]);

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
      <div
        className="flex items-center justify-center rounded-lg border border-border p-10"
        style={{
          background:
            "linear-gradient(135deg, #ea7a18 0%, #c2410c 40%, #7c3aed 100%)",
        }}
      >
        <div className="flex h-32 w-56 items-center justify-center" style={style}>
          <span className="font-display text-lg text-white drop-shadow">Glass</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="glass-blur" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Blur
            </label>
            <span className="font-mono text-sm text-foreground">{cfg.blur}px</span>
          </div>
          <input
            id="glass-blur"
            type="range"
            min={0}
            max={30}
            value={cfg.blur}
            onChange={(e) => setCfg((c) => ({ ...c, blur: Number(e.target.value) }))}
            className="w-full accent-accent"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="glass-transparency" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Transparency
            </label>
            <span className="font-mono text-sm text-foreground">
              {cfg.transparency.toFixed(2)}
            </span>
          </div>
          <input
            id="glass-transparency"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={cfg.transparency}
            onChange={(e) => setCfg((c) => ({ ...c, transparency: Number(e.target.value) }))}
            className="w-full accent-accent"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="glass-radius" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Radius
            </label>
            <span className="font-mono text-sm text-foreground">{cfg.borderRadius}px</span>
          </div>
          <input
            id="glass-radius"
            type="range"
            min={0}
            max={48}
            value={cfg.borderRadius}
            onChange={(e) => setCfg((c) => ({ ...c, borderRadius: Number(e.target.value) }))}
            className="w-full accent-accent"
          />
        </div>
        <div className="flex items-end gap-6">
          <div>
            <label htmlFor="glass-color" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Tint
            </label>
            <input
              id="glass-color"
              type="color"
              value={cfg.color}
              onChange={(e) => setCfg((c) => ({ ...c, color: e.target.value }))}
              className="h-11 w-16 cursor-pointer rounded-lg border border-border bg-card"
            />
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 pb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <input
              type="checkbox"
              checked={cfg.showBorder}
              onChange={(e) => setCfg((c) => ({ ...c, showBorder: e.target.checked }))}
              className="h-3.5 w-3.5 accent-accent"
            />
            Border
          </label>
        </div>
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
        The frosted look comes from a semi-transparent fill plus{" "}
        <code className="text-foreground">backdrop-filter: blur()</code>. Note
        backdrop-filter isn&apos;t supported in every browser. Runs locally.
      </p>
    </div>
  );
};

export default GlassmorphismGenerator;
