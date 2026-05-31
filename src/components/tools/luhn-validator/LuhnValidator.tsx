"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, X } from "lucide-react";
import { luhnCheck } from "./luhn";

const LuhnValidator = () => {
  const [input, setInput] = useState("4111 1111 1111 1111");
  const result = useMemo(() => luhnCheck(input), [input]);
  const hasValue = result.sanitized.length > 0;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="luhn-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Number
        </label>
        <input
          id="luhn-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode="numeric"
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
        hasValue && (
          <div className="space-y-3">
            <div
              className={`flex items-center gap-3 rounded-lg border px-4 py-4 ${
                result.valid
                  ? "border-accent/50 bg-accent/10"
                  : "border-destructive/40 bg-destructive/10"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  result.valid
                    ? "bg-accent text-accent-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                {result.valid ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </span>
              <span
                className={`font-display text-xl tracking-tight ${
                  result.valid ? "text-foreground" : "text-destructive"
                }`}
              >
                {result.valid ? "Valid checksum" : "Invalid checksum"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Detected type
              </span>
              <span className="font-mono text-sm text-foreground">
                {result.cardType || "Unknown"}
              </span>
            </div>
          </div>
        )
      )}

      <p className="text-sm text-muted-foreground">
        The Luhn (mod 10) algorithm is a checksum used by payment cards, IMEIs
        and more. It catches typos, not whether a number is actually issued.
        Spaces and dashes are ignored. Runs locally.
      </p>
    </div>
  );
};

export default LuhnValidator;
