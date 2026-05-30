"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { textToNato } from "./nato";

const NatoPhonetic = () => {
  const [input, setInput] = useState("Kiro 42");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => textToNato(input), [input]);

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
          htmlFor="nato-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Text
        </label>
        <input
          id="nato-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Phonetic
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
        <div className="min-h-[3.5rem] rounded-lg border border-border bg-muted/40 px-4 py-3 text-lg leading-relaxed text-foreground">
          {output || <span className="text-muted-foreground">—</span>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Each letter maps to its NATO code word (and digits to Zero–Niner); words
        are separated by a slash. Great for reading out codes over the phone.
        Runs locally.
      </p>
    </div>
  );
};

export default NatoPhonetic;
