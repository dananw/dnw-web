"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findReplace, type ReplaceOptions } from "./findReplace";

const SAMPLE = "The cat sat on the mat. The cat was happy.";

type BoolKey = keyof ReplaceOptions;

const OPTIONS: { key: BoolKey; label: string }[] = [
  { key: "regex", label: "Regex" },
  { key: "caseInsensitive", label: "Ignore case" },
  { key: "global", label: "Replace all" },
];

const FindReplace = () => {
  const [input, setInput] = useState(SAMPLE);
  const [find, setFind] = useState("cat");
  const [replace, setReplace] = useState("dog");
  const [opts, setOpts] = useState<ReplaceOptions>({
    regex: false,
    caseInsensitive: false,
    global: true,
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => findReplace(input, find, replace, opts),
    [input, find, replace, opts]
  );

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
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fr-find"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Find
          </label>
          <input
            id="fr-find"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            spellCheck={false}
            className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="fr-replace"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Replace with
          </label>
          <input
            id="fr-replace"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

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
        {result.ok && (
          <span className="ml-auto font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {result.count} match{result.count === 1 ? "" : "es"}
          </span>
        )}
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            <span className="font-medium">Invalid pattern.</span> {result.error}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="fr-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Input
          </label>
          <textarea
            id="fr-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Result
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
            className="h-56 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        With regex on, the find field is a JavaScript pattern and{" "}
        <code className="text-foreground">$1</code> style backreferences work in
        the replacement. Runs locally.
      </p>
    </div>
  );
};

export default FindReplace;
