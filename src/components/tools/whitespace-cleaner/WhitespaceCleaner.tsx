"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cleanWhitespace, DEFAULT_CLEAN, type CleanOptions } from "./whitespace";

const SAMPLE = "  Hello   world  \n\n\n   Lots   of    space   here \n\n";

type BoolKey = Exclude<keyof CleanOptions, "tabWidth">;

const OPTIONS: { key: BoolKey; label: string }[] = [
  { key: "trimLines", label: "Trim each line" },
  { key: "collapseSpaces", label: "Collapse spaces" },
  { key: "removeBlankLines", label: "Remove blank lines" },
  { key: "removeAllLineBreaks", label: "Remove all line breaks" },
  { key: "tabsToSpaces", label: "Tabs → spaces" },
];

const WhitespaceCleaner = () => {
  const [input, setInput] = useState(SAMPLE);
  const [opts, setOpts] = useState<CleanOptions>(DEFAULT_CLEAN);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => cleanWhitespace(input, opts), [input, opts]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {OPTIONS.map((opt) => (
          <label
            key={opt.key}
            className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
          >
            <input
              type="checkbox"
              checked={opts[opt.key]}
              onChange={() => setOpts((o) => ({ ...o, [opt.key]: !o[opt.key] }))}
              className="h-3.5 w-3.5 accent-accent"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="ws-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Input
          </label>
          <textarea
            id="ws-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Cleaned
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!output}
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
          <textarea
            readOnly
            value={output}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Transformations are applied together in a sensible order. “Remove all
        line breaks” flattens everything into a single line. Runs locally.
      </p>
    </div>
  );
};

export default WhitespaceCleaner;
