"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toLeet } from "./leet";

const Leetspeak = () => {
  const [input, setInput] = useState("Elite hacker");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => toLeet(input), [input]);

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
          htmlFor="leet-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Input
        </label>
        <textarea
          id="leet-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            L33t
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
        <div className="min-h-[7rem] w-full whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/40 p-4 font-mono text-lg leading-relaxed text-foreground">
          {output}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Swaps common letters for look-alike numbers and symbols (a→4, e→3, l/i→1,
        o→0, s→5, t→7…). A one-way, for-fun transform. Runs locally.
      </p>
    </div>
  );
};

export default Leetspeak;
