"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fromScientific, toScientific } from "./scientific";

type Direction = "toScientific" | "fromScientific";

const SAMPLES: Record<Direction, string> = {
  toScientific: "123450",
  fromScientific: "1.2345e5",
};

const ScientificNotation = () => {
  const [direction, setDirection] = useState<Direction>("toScientific");
  const [input, setInput] = useState(SAMPLES.toScientific);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (direction === "toScientific" ? toScientific(input) : fromScientific(input)),
    [direction, input]
  );

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

  const switchDir = (d: Direction) => {
    setDirection(d);
    setInput(SAMPLES[d]);
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["toScientific", "fromScientific"] as Direction[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => switchDir(d)}
            aria-pressed={direction === d}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              direction === d ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d === "toScientific" ? "Decimal → Sci" : "Sci → Decimal"}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="sci-input" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {direction === "toScientific" ? "Decimal number" : "Scientific notation"}
        </label>
        <input
          id="sci-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-lg text-foreground outline-none transition-colors focus:border-accent/60 ${
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
              {direction === "toScientific" ? "Scientific" : "Decimal"}
            </span>
            <Button type="button" size="sm" variant="outline" onClick={handleCopy} disabled={!result.value} className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
              {copied ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
            </Button>
          </div>
          <div className="min-h-[3rem] break-all rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-lg text-foreground">
            {result.value || <span className="text-muted-foreground">—</span>}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Accepts both <code className="text-foreground">1.5e3</code> and{" "}
        <code className="text-foreground">1.5 × 10^3</code> when converting back to
        a decimal. Runs locally.
      </p>
    </div>
  );
};

export default ScientificNotation;
