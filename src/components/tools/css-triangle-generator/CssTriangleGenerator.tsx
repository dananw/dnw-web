"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_TRIANGLE,
  DIRECTIONS,
  triangleCss,
  triangleStyle,
  type TriangleConfig,
  type TriangleDirection,
} from "./cssTriangle";

const CssTriangleGenerator = () => {
  const [cfg, setCfg] = useState<TriangleConfig>(DEFAULT_TRIANGLE);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => triangleCss(cfg), [cfg]);
  const style = useMemo(() => triangleStyle(cfg) as CSSProperties, [cfg]);

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
      <div className="flex min-h-[10rem] items-center justify-center rounded-lg border border-border bg-muted/40 p-6">
        <span style={style} aria-label="Triangle preview" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setCfg((c) => ({ ...c, direction: d as TriangleDirection }))}
              aria-pressed={cfg.direction === d}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase capitalize tracking-[0.12em] transition-colors ${
                cfg.direction === d
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-3">
          <label
            htmlFor="tri-color"
            className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
          >
            <span className="mb-2 block">Color</span>
            <input
              id="tri-color"
              type="color"
              value={cfg.color}
              onChange={(e) => setCfg((c) => ({ ...c, color: e.target.value }))}
              className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-card"
            />
          </label>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="tri-size"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Size
          </label>
          <span className="font-mono text-sm text-foreground">{cfg.size}px</span>
        </div>
        <input
          id="tri-size"
          type="range"
          min={10}
          max={150}
          value={cfg.size}
          onChange={(e) => setCfg((c) => ({ ...c, size: Number(e.target.value) }))}
          className="w-full accent-accent"
        />
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
        Triangles are made from an element with zero size and thick, partly
        transparent borders — a classic CSS trick that needs no images. Runs
        locally.
      </p>
    </div>
  );
};

export default CssTriangleGenerator;
