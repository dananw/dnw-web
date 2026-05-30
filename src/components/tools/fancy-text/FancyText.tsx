"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { STYLES, styleText } from "./fancyText";

const FancyText = () => {
  const [input, setInput] = useState("Danan Wijaya");
  const [copied, setCopied] = useState<string | null>(null);

  const styled = useMemo(
    () => STYLES.map((s) => ({ id: s.id, label: s.label, text: styleText(input, s.id) })),
    [input]
  );

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="fancy-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Text
        </label>
        <input
          id="fancy-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-lg text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {styled.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => copy(s.id, s.text)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/40"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </span>
              <span className="block truncate text-lg text-foreground">{s.text}</span>
            </span>
            {copied === s.id ? (
              <Check className="h-4 w-4 flex-shrink-0 text-accent" />
            ) : (
              <Copy className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        These are real Unicode characters (Mathematical Alphanumeric Symbols), so
        they paste anywhere — bios, usernames, posts. Tap a style to copy. Runs
        locally.
      </p>
    </div>
  );
};

export default FancyText;
