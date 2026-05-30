"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { convertAll } from "./cases";

const SAMPLE = "convert this string please";

const CaseConverter = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rows = useMemo(() => convertAll(input), [input]);

  const handleCopy = async (key: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="case-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Input
        </label>
        <input
          id="case-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Type any text, variable, or phrase…"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {row.label}
              </p>
              <p className="mt-1 truncate font-mono text-sm text-foreground">
                {row.value || <span className="text-muted-foreground/50">—</span>}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(row.key, row.value)}
              disabled={!row.value}
              aria-label={`Copy ${row.label}`}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-40"
            >
              {copiedKey === row.key ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Detects words from camelCase, snake_case, kebab-case, and spaced text —
        including acronyms — then rewrites them in every common naming style.
      </p>
    </div>
  );
};

export default CaseConverter;
