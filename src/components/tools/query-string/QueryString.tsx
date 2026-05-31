"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseQueryString } from "./queryString";

const SAMPLE = "https://example.com/search?q=hello+world&page=2&tag=js&tag=ts";

const QueryString = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => parseQueryString(input), [input]);

  const handleCopy = async () => {
    if (!result.json) return;
    try {
      await navigator.clipboard.writeText(result.json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="qs-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Query string or URL
        </label>
        <textarea
          id="qs-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Paste a URL or query string…"
          className="h-28 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      {result.pairs.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Parameters
            </span>
            <div className="divide-y divide-border/60 rounded-lg border border-border">
              {result.pairs.map((p, i) => (
                <div
                  key={`${p.key}-${i}`}
                  className="flex items-baseline gap-3 px-4 py-2.5"
                >
                  <span className="font-mono text-sm text-accent">{p.key}</span>
                  <span className="ml-auto break-all text-right font-mono text-sm text-foreground">
                    {p.value || <span className="text-muted-foreground">∅</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex h-7 items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                JSON
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
            <pre className="h-full max-h-72 overflow-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
              {result.json}
            </pre>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Paste a full URL or a bare query string. Repeated keys are preserved in
        the table and collapsed into arrays in the JSON. Runs locally.
      </p>
    </div>
  );
};

export default QueryString;
