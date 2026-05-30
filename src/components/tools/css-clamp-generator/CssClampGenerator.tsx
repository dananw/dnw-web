"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_CLAMP, buildClamp, type ClampInput } from "./cssClamp";

const FIELDS: { key: keyof ClampInput; label: string }[] = [
  { key: "minSize", label: "Min size (px)" },
  { key: "maxSize", label: "Max size (px)" },
  { key: "minViewport", label: "Min viewport (px)" },
  { key: "maxViewport", label: "Max viewport (px)" },
  { key: "rootFontSize", label: "Root font (px)" },
];

const CssClampGenerator = () => {
  const [input, setInput] = useState<ClampInput>(DEFAULT_CLAMP);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => buildClamp(input), [input]);

  const handleCopy = async () => {
    if (!result.ok || !result.value) return;
    try {
      await navigator.clipboard.writeText(`font-size: ${result.value};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`clamp-${f.key}`}
              className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
            >
              {f.label}
            </label>
            <input
              id={`clamp-${f.key}`}
              type="number"
              value={input[f.key]}
              onChange={(e) =>
                setInput((s) => ({ ...s, [f.key]: Number(e.target.value) }))
              }
              className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
            />
          </div>
        ))}
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
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
          <div className="break-all rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
            font-size: {result.value};
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Generates a fluid <code className="text-foreground">clamp()</code> that
        scales linearly between the two viewport widths, then locks at the min
        and max. Sizes are output in rem. Runs locally.
      </p>
    </div>
  );
};

export default CssClampGenerator;
