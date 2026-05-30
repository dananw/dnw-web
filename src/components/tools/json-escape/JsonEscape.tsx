"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ArrowRightLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { escapeJson, unescapeJson } from "./escape";

type Mode = "escape" | "unescape";

const SAMPLE = `Line one
A "quoted" word & a tab\there.`;

const JsonEscape = () => {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>("escape");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (mode === "escape") return { output: escapeJson(input), error: undefined };
    const r = unescapeJson(input);
    return { output: r.output, error: r.ok ? undefined : r.error };
  }, [input, mode]);

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-border p-1">
          {(["escape", "unescape"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] capitalize transition-colors ${
                mode === m
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setMode((m) => (m === "escape" ? "unescape" : "escape"))
          }
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightLeft className="h-3 w-3" /> Swap
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="esc-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {mode === "escape" ? "Raw text" : "Escaped string"}
          </label>
          <textarea
            id="esc-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className={`h-56 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              error ? "border-destructive/70" : "border-border"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="esc-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {mode === "escape" ? "Escaped string" : "Raw text"}
            </label>
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
            id="esc-output"
            value={output}
            readOnly
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Escape turns raw text into a JSON-safe string body (quotes, newlines,
        tabs, control chars). Unescape reverses it — paste with or without the
        surrounding quotes. All local.
      </p>
    </div>
  );
};

export default JsonEscape;
