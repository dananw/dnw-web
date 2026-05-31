"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CORNERS,
  DEFAULT_RADIUS,
  buildRadius,
  borderRadiusCss,
  type RadiusConfig,
} from "./borderRadius";

const BorderRadiusGenerator = () => {
  const [cfg, setCfg] = useState<RadiusConfig>(DEFAULT_RADIUS);
  const [copied, setCopied] = useState(false);

  const radius = useMemo(() => buildRadius(cfg), [cfg]);
  const css = useMemo(() => borderRadiusCss(cfg), [cfg]);

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
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 py-12">
        <div
          className="h-36 w-56 border-2 border-accent bg-accent/10"
          style={{ borderRadius: radius }}
          aria-label="Border radius preview"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {CORNERS.map((corner) => (
          <div key={corner.key}>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={`radius-${corner.key}`}
                className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                {corner.label}
              </label>
              <span className="font-mono text-sm text-foreground">
                {cfg[corner.key]}px
              </span>
            </div>
            <input
              id={`radius-${corner.key}`}
              type="range"
              min={0}
              max={100}
              value={cfg[corner.key]}
              onChange={(e) =>
                setCfg((c) => ({ ...c, [corner.key]: Number(e.target.value) }))
              }
              className="w-full accent-accent"
            />
          </div>
        ))}
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
        <div className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
          {css}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Round each corner independently; the CSS collapses to a single value when
        all four match. Runs locally.
      </p>
    </div>
  );
};

export default BorderRadiusGenerator;
