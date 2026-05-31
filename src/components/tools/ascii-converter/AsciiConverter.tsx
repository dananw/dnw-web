"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RADICES, textToRadix, radixToText, type Radix } from "./ascii";

type Direction = "encode" | "decode";

const AsciiConverter = () => {
  const [direction, setDirection] = useState<Direction>("encode");
  const [radix, setRadix] = useState<Radix>("binary");
  const [input, setInput] = useState("Hello");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (direction === "encode") {
      return { ok: true as const, value: textToRadix(input, radix) };
    }
    return radixToText(input, radix);
  }, [direction, radix, input]);

  const handleCopy = async () => {
    if (!output.ok || !output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {(["encode", "decode"] as Direction[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDirection(d)}
              aria-pressed={direction === d}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                direction === d
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d === "encode" ? "Text → Code" : "Code → Text"}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Base
          <select
            value={radix}
            onChange={(e) => setRadix(e.target.value as Radix)}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm capitalize text-foreground outline-none focus:border-accent/60"
          >
            {RADICES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label
          htmlFor="ascii-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          {direction === "encode" ? "Text" : `${radix} bytes`}
        </label>
        <textarea
          id="ascii-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className={`h-28 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
            output.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      {!output.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{output.error}</span>
        </div>
      ) : (
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {direction === "encode" ? `${radix} bytes` : "Text"}
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!output.value}
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
          <div className="min-h-[7rem] w-full break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {output.value}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Encoding uses UTF-8 bytes, so non-ASCII characters expand to multiple
        bytes. Decoding expects space-separated values. Runs locally.
      </p>
    </div>
  );
};

export default AsciiConverter;
