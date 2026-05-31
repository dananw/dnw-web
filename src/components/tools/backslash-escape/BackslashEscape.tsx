"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { escapeString, unescapeString } from "./escape";

type Direction = "escape" | "unescape";

const SAMPLES: Record<Direction, string> = {
  escape: 'Line one\nLine two\tTabbed "quoted"',
  unescape: 'Line one\\nLine two\\tTabbed \\"quoted\\"',
};

const BackslashEscape = () => {
  const [direction, setDirection] = useState<Direction>("escape");
  const [input, setInput] = useState(SAMPLES.escape);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (direction === "escape" ? escapeString(input) : unescapeString(input)),
    [direction, input]
  );

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

  const switchDir = (d: Direction) => {
    setDirection(d);
    setInput(SAMPLES[d]);
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["escape", "unescape"] as Direction[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => switchDir(d)}
            aria-pressed={direction === d}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase capitalize tracking-[0.12em] transition-colors ${
              direction === d
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="esc-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Input
          </label>
          <textarea
            id="esc-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Output
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
            className="h-56 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Escaping converts real newlines, tabs and quotes into <code className="text-foreground">\n</code>,{" "}
        <code className="text-foreground">\t</code>, <code className="text-foreground">\&quot;</code>;
        unescaping also resolves <code className="text-foreground">\uXXXX</code> and{" "}
        <code className="text-foreground">\xXX</code>. Runs locally.
      </p>
    </div>
  );
};

export default BackslashEscape;
