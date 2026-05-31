"use client";

import { useState } from "react";
import { AlertCircle, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseItems, pickRandom, type PickResult } from "./randomPicker";

const SAMPLE = "Alice\nBob\nCharlie\nDana\nElliot";

const RandomPicker = () => {
  const [input, setInput] = useState(SAMPLE);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(true);
  const [result, setResult] = useState<PickResult | null>(null);

  const pick = () => setResult(pickRandom(parseItems(input), count, unique));

  const itemCount = parseItems(input).length;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="picker-input" className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span>Items (one per line)</span>
          <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        </label>
        <textarea
          id="picker-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="h-44 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Pick
          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          No repeats
        </label>
        <Button onClick={pick} className="ml-auto gap-1.5">
          <Shuffle className="h-4 w-4" /> Pick
        </Button>
      </div>

      {result && !result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      {result && result.ok && (
        <div className="flex flex-wrap gap-2">
          {result.picks.map((p, i) => (
            <span
              key={i}
              className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-1.5 font-mono text-sm text-accent"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Picks fairly using the Web Crypto API. With “no repeats” it shuffles and
        draws without replacement. Runs locally.
      </p>
    </div>
  );
};

export default RandomPicker;
