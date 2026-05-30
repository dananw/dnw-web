"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonToQuery } from "./jsonToQuery";

const SAMPLE = `{
  "q": "hello world",
  "tags": ["js", "ts"],
  "page": 2
}`;

const JsonToQuery = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => jsonToQuery(input), [input]);

  const handleCopy = async () => {
    if (!result.ok || !result.value) return;
    try {
      await navigator.clipboard.writeText(result.value);
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
          htmlFor="j2q-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          JSON object
        </label>
        <textarea
          id="j2q-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className={`h-44 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
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
              Query string
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
          <div className="min-h-[3rem] w-full break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {result.value ? `?${result.value}` : <span className="text-muted-foreground">—</span>}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Array values expand into repeated keys; nested objects are JSON-encoded.
        Values are URL-encoded for you. Runs locally.
      </p>
    </div>
  );
};

export default JsonToQuery;
