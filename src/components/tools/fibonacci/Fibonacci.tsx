"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fibonacci } from "./fibonacci";

const Fibonacci = () => {
  const [count, setCount] = useState(15);
  const [copied, setCopied] = useState(false);

  const sequence = useMemo(() => fibonacci(count), [count]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sequence.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">How many terms</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy all
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sequence.map((n, i) => (
          <span
            key={i}
            className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground"
          >
            <span className="text-muted-foreground">{i}:</span> {n}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Each term is the sum of the previous two, starting from 0 and 1. Big
        integers keep large terms exact. Runs locally.
      </p>
    </div>
  );
};

export default Fibonacci;
