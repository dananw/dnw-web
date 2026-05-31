"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortJson, type SortOrder } from "./jsonSort";

const SAMPLE = `{"name":"Danan","stack":["Next.js","TypeScript"],"active":true,"age":29}`;

const JsonSort = () => {
  const [input, setInput] = useState(SAMPLE);
  const [order, setOrder] = useState<SortOrder>("asc");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => sortJson(input, order), [input, order]);

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {(["asc", "desc"] as SortOrder[]).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrder(o)}
              aria-pressed={order === o}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                order === o
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {o === "asc" ? "A → Z" : "Z → A"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="jsonsort-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Input
          </label>
          <textarea
            id="jsonsort-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste JSON here…"
            className={`h-72 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Sorted
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.ok || !result.value}
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
            value={result.ok ? result.value : ""}
            spellCheck={false}
            className="h-72 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            <span className="font-medium">Invalid JSON.</span> {result.error}
          </span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Object keys are sorted recursively; array order is preserved. Handy for
        producing stable diffs. Runs locally.
      </p>
    </div>
  );
};

export default JsonSort;
