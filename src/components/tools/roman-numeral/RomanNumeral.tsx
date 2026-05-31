"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toRoman, fromRoman } from "./roman";

type Direction = "toRoman" | "fromRoman";

const RomanNumeral = () => {
  const [direction, setDirection] = useState<Direction>("toRoman");
  const [input, setInput] = useState("2024");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (direction === "toRoman") {
      const n = Number(input);
      if (input.trim() === "" || Number.isNaN(n)) {
        return input.trim() === ""
          ? { ok: true as const, value: "" }
          : { ok: false as const, value: "", error: "Enter a valid number" };
      }
      return toRoman(n);
    }
    return fromRoman(input);
  }, [direction, input]);

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

  const switchDirection = (d: Direction) => {
    setDirection(d);
    setInput(d === "toRoman" ? "2024" : "MMXXIV");
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["toRoman", "fromRoman"] as Direction[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => switchDirection(d)}
            aria-pressed={direction === d}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              direction === d
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d === "toRoman" ? "Number → Roman" : "Roman → Number"}
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor="roman-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          {direction === "toRoman" ? "Number (1–3999)" : "Roman numeral"}
        </label>
        <input
          id="roman-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode={direction === "toRoman" ? "numeric" : "text"}
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-2xl tracking-wide text-foreground outline-none transition-colors focus:border-accent/60 ${
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
              {direction === "toRoman" ? "Roman numeral" : "Number"}
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
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-2xl tracking-wide text-foreground">
            {result.value || <span className="text-muted-foreground">—</span>}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Supports the standard range 1–3999. Non-canonical numerals like{" "}
        <code className="text-foreground">IIII</code> are rejected. Runs locally.
      </p>
    </div>
  );
};

export default RomanNumeral;
