"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { flipCoins, type CoinResult } from "./coin";

const CoinFlip = () => {
  const [count, setCount] = useState(10);
  const [result, setResult] = useState<CoinResult>(() => flipCoins(10));

  const flip = () => setResult(flipCoins(count));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span className="mb-2 block">Coins</span>
          <input
            type="number"
            min={1}
            max={10000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-28 rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <Button onClick={flip} className="gap-1.5">
          <Coins className="h-4 w-4" /> Flip
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border px-4 py-4 text-center">
          <div className="font-display text-3xl tracking-tight text-foreground">{result.heads}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Heads</div>
        </div>
        <div className="rounded-lg border border-border px-4 py-4 text-center">
          <div className="font-display text-3xl tracking-tight text-foreground">{result.tails}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Tails</div>
        </div>
      </div>

      {result.results.length <= 200 && (
        <div className="flex flex-wrap gap-1.5">
          {result.results.map((side, i) => (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs ${
                side === "H"
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {side}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Each flip is an independent fair coin drawn from the Web Crypto API.
        Individual results are shown for up to 200 coins. Runs locally.
      </p>
    </div>
  );
};

export default CoinFlip;
