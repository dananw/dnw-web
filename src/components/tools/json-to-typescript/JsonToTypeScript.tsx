"use client";

import { useMemo, useState } from "react";
import { Check, Copy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonToTypeScript } from "./generate";

const SAMPLE = `{
  "id": 42,
  "name": "Danan",
  "active": true,
  "roles": ["admin", "editor"],
  "profile": { "city": "Ngawi", "since": 2014 }
}`;

const JsonToTypeScript = () => {
  const [input, setInput] = useState(SAMPLE);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => jsonToTypeScript(input, rootName || "Root"),
    [input, rootName]
  );

  const handleCopy = async () => {
    if (!result.ok || !result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Root name
          <input
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            spellCheck={false}
            className="w-40 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="jts-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            JSON
          </label>
          <textarea
            id="jts-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste a JSON sample…"
            className={`h-96 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="jts-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              TypeScript
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.ok || !result.output}
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
            id="jts-output"
            value={result.ok ? result.output : ""}
            readOnly
            spellCheck={false}
            className="h-96 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
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
        Infers types from your sample, including nested objects, arrays, mixed
        unions and optional keys (when an array of objects has inconsistent
        fields). Runs entirely in your browser.
      </p>
    </div>
  );
};

export default JsonToTypeScript;
