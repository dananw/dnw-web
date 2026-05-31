"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTitleCase } from "./titleCase";

const TitleCase = () => {
  const [input, setInput] = useState("the lord of the rings: the two towers");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => toTitleCase(input), [input]);

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
          htmlFor="tc-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Input
        </label>
        <textarea
          id="tc-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Title case
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
        Capitalizes each word but keeps minor words (a, an, the, of, and…)
        lowercase unless they start or end the title. Runs locally.
      </p>
    </div>
  );
};

export default TitleCase;
