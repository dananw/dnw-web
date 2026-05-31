"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { factorial } from "./factorial";

const Factorial = () => {
  const [input, setInput] = useState("20");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => factorial(input), [input]);

  const handleCopy = async () => {
    if (!result.ok || !result.value) return;
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
      <div>
        <label
          htmlFor="fact-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          n
        </label>
        <input
          id="fact-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode="numeric"
          className={`w-40 rounded-lg border bg-card px-4 py-3 font-mono text-2xl text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        result.value && (
          <div>
            <div className="mb-2 flex h-7 items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                n! · {result.digits.toLocaleString("en-US")} digits
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCopy}
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
            <div className="max-h-72 overflow-auto break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
              {result.value}
            </div>
          </div>
        )
      )}

      <p className="text-sm text-muted-foreground">
        Uses JavaScript big integers, so results stay exact no matter how many
        digits they have (up to n = 10,000). Runs locally.
      </p>
    </div>
  );
};

export default Factorial;
