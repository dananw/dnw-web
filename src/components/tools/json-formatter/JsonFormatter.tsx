"use client";

import { useState } from "react";
import { Check, Copy, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { beautifyJson, minifyJson, type FormatResult } from "./format";

const SAMPLE = `{"name":"Danan","role":"Full Stack Developer","stack":["Next.js","TypeScript"],"available":true}`;

const JsonFormatter = () => {
  const [input, setInput] = useState(SAMPLE);
  const [result, setResult] = useState<FormatResult>({ ok: true, result: "" });
  const [copied, setCopied] = useState(false);

  const run = (fn: (s: string) => FormatResult) => {
    const r = fn(input);
    setResult(r);
    if (r.ok) setInput(r.result || input);
  };

  const handleCopy = async () => {
    if (!result.ok || !result.result) return;
    try {
      await navigator.clipboard.writeText(result.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => run((s) => beautifyJson(s, 2))}>
          Beautify
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => run((s) => minifyJson(s))}
        >
          Minify
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          disabled={!result.ok || !result.result}
          className="gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </Button>
        <button
          type="button"
          onClick={() => {
            setInput("");
            setResult({ ok: true, result: "" });
          }}
          className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Trash2 className="h-3 w-3" /> Clear
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        placeholder="Paste JSON here…"
        className={`h-96 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
          result.ok ? "border-border" : "border-destructive/70"
        }`}
      />

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div>
            <span className="font-medium">Invalid JSON.</span>{" "}
            {result.line
              ? `Problem near line ${result.line}, column ${result.column}.`
              : result.message}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Runs entirely in your browser. Beautify re-indents with 2 spaces, minify
        strips all whitespace, and validation pinpoints where parsing fails.
      </p>
    </div>
  );
};

export default JsonFormatter;
