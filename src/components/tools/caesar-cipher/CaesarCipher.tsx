"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caesarShift } from "./caesar";

type Direction = "encode" | "decode";

const CaesarCipher = () => {
  const [input, setInput] = useState("Hello, World!");
  const [shift, setShift] = useState(3);
  const [direction, setDirection] = useState<Direction>("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => caesarShift(input, direction === "encode" ? shift : -shift),
    [input, shift, direction]
  );

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
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
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] capitalize transition-colors ${
                direction === d
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setShift(13)}
          className="font-mono text-[11px] uppercase tracking-[0.12em]"
        >
          ROT13
        </Button>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="caesar-shift"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Shift
          </label>
          <span className="font-mono text-sm text-foreground">{shift}</span>
        </div>
        <input
          id="caesar-shift"
          type="range"
          min={0}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <div>
        <label
          htmlFor="caesar-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Input
        </label>
        <textarea
          id="caesar-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Output
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
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
        <div className="min-h-[7rem] w-full whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
          {output}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Only letters are shifted; numbers, spaces and punctuation pass through
        unchanged. ROT13 is a shift of 13 and is its own inverse. Runs locally.
      </p>
    </div>
  );
};

export default CaesarCipher;
