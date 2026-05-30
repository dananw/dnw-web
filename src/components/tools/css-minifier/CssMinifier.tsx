"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { minifyCss } from "./cssMinify";

const SAMPLE = `.card {
  /* spacing */
  padding: 16px;
  margin: 0 auto;
  color: #1a1a1a;
}

.card:hover {
  color: #ea7a18;
}`;

const CssMinifier = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => minifyCss(input), [input]);

  const handleCopy = async () => {
    if (!result.value) return;
    try {
      await navigator.clipboard.writeText(result.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="css-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            CSS
          </label>
          <textarea
            id="css-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Minified
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.value}
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
            value={result.value}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-sm">
        <span className="text-muted-foreground">
          Original{" "}
          <span className="text-foreground">{result.originalSize.toLocaleString("en-US")} B</span>
        </span>
        <span className="text-muted-foreground">
          Minified{" "}
          <span className="text-foreground">{result.minifiedSize.toLocaleString("en-US")} B</span>
        </span>
        <span className="ml-auto text-accent">−{result.savedPercent}%</span>
      </div>

      <p className="text-sm text-muted-foreground">
        A conservative minifier: it removes comments and collapses whitespace but
        keeps spaces around <code className="text-foreground">+ - &gt; ~</code> so{" "}
        <code className="text-foreground">calc()</code> and combinators still
        work. Runs locally.
      </p>
    </div>
  );
};

export default CssMinifier;
