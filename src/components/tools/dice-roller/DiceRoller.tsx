"use client";

import { useState } from "react";
import { AlertCircle, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rollDice, type DiceResult } from "./dice";

const QUICK = ["d6", "d20", "2d6", "4d6+2", "1d100"];

const DiceRoller = () => {
  const [notation, setNotation] = useState("2d6");
  const [result, setResult] = useState<DiceResult>(() => rollDice("2d6"));

  const roll = (n: string) => {
    setNotation(n);
    setResult(rollDice(n));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1">
          <label
            htmlFor="dice-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Notation
          </label>
          <input
            id="dice-input"
            value={notation}
            onChange={(e) => setNotation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && roll(notation)}
            spellCheck={false}
            placeholder="2d6+3"
            className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <Button onClick={() => roll(notation)} className="gap-1.5">
          <Dices className="h-4 w-4" /> Roll
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => roll(q)}
            className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs lowercase text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {result.rolls.map((r, i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card font-mono text-lg text-foreground"
              >
                {r}
              </span>
            ))}
          </div>
          <div className="flex items-baseline gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Total
            </span>
            <span className="font-display text-2xl text-foreground">{result.total}</span>
            {result.modifier !== 0 && (
              <span className="font-mono text-xs text-muted-foreground">
                (rolls {result.total - result.modifier} {result.modifier > 0 ? "+" : "−"}{" "}
                {Math.abs(result.modifier)})
              </span>
            )}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Use standard dice notation like <code className="text-foreground">2d6+3</code>{" "}
        (two six-sided dice plus three). Rolls use the Web Crypto API for fair
        randomness. Runs locally.
      </p>
    </div>
  );
};

export default DiceRoller;
