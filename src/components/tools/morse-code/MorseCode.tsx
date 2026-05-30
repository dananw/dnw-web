"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { textToMorse, morseToText } from "./morse";

type Direction = "encode" | "decode";

const MorseCode = () => {
  const [direction, setDirection] = useState<Direction>("encode");
  const [input, setInput] = useState("SOS HELP");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (direction === "encode" ? textToMorse(input) : morseToText(input)),
    [direction, input]
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
            {d === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor="morse-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          {direction === "encode" ? "Text" : "Morse"}
        </label>
        <textarea
          id="morse-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder={direction === "encode" ? "Type text…" : "... --- ..."}
          className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {direction === "encode" ? "Morse" : "Text"}
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
        Letters are separated by spaces and words by a slash (
        <code className="text-foreground">/</code>). Unknown characters become a{" "}
        <code className="text-foreground">?</code> when decoding. Runs locally.
      </p>
    </div>
  );
};

export default MorseCode;
