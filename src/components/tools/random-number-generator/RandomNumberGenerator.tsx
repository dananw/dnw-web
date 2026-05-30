"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateRandomNumbers, type RandomResult } from "./random";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(false);
  const [result, setResult] = useState<RandomResult>({ ok: true, numbers: [] });
  const [copied, setCopied] = useState(false);

  const regenerate = () =>
    setResult(generateRandomNumbers(Number(min), Number(max), count, unique));

  useEffect(() => {
    setResult(generateRandomNumbers(Number(min), Number(max), count, unique));
  }, [min, max, count, unique]);

  const handleCopyAll = async () => {
    if (!result.numbers.length) return;
    try {
      await navigator.clipboard.writeText(result.numbers.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Min</span>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Max</span>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Count</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-24 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 pb-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          Unique
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={regenerate} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopyAll}
          disabled={!result.numbers.length}
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

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {result.numbers.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground"
            >
              {n}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Numbers are drawn from the Web Crypto API with rejection sampling, so the
        distribution is unbiased across the range. Runs locally.
      </p>
    </div>
  );
};

export default RandomNumberGenerator;
