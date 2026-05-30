"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { repeatText, type RepeatSeparator } from "./repeatText";

const SEPARATORS: { value: RepeatSeparator; label: string }[] = [
  { value: "none", label: "None" },
  { value: "newline", label: "New line" },
  { value: "space", label: "Space" },
  { value: "comma", label: "Comma" },
];

const TextRepeater = () => {
  const [input, setInput] = useState("Kiro ");
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState<RepeatSeparator>("none");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => repeatText(input, count, separator),
    [input, count, separator]
  );

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
    <div className="space-y-5">
      <div>
        <label
          htmlFor="rep-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Text
        </label>
        <textarea
          id="rep-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="h-24 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Repeat
          <input
            type="number"
            min={0}
            max={10000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className="w-24 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
          times
        </label>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Separator
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value as RepeatSeparator)}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {SEPARATORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Output
          </span>
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
          readOnly
          value={output}
          spellCheck={false}
          className="h-40 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Repeats your text up to 10,000 times with an optional separator between
        copies. Runs locally.
      </p>
    </div>
  );
};

export default TextRepeater;
