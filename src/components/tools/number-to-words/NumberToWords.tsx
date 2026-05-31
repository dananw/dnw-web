"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { numberToWords } from "./numberToWords";

const NumberToWords = () => {
  const [input, setInput] = useState("1234567.89");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => numberToWords(input), [input]);

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
          htmlFor="ntw-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Number
        </label>
        <input
          id="ntw-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode="decimal"
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-2xl text-foreground outline-none transition-colors focus:border-accent/60 ${
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
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              In words
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
          <div className="min-h-[3.5rem] rounded-lg border border-border bg-muted/40 px-4 py-3 text-lg leading-relaxed text-foreground">
            {result.value || <span className="text-muted-foreground">—</span>}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Handles negatives and decimals (read out digit by digit after the
        point), up to the quadrillions. Runs locally.
      </p>
    </div>
  );
};

export default NumberToWords;
