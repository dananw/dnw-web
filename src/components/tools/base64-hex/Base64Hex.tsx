"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base64ToHex, hexToBase64 } from "./base64Hex";

type Direction = "b64ToHex" | "hexToB64";

const Base64Hex = () => {
  const [direction, setDirection] = useState<Direction>("b64ToHex");
  const [input, setInput] = useState("SGVsbG8=");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (direction === "b64ToHex" ? base64ToHex(input) : hexToBase64(input)),
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
    setInput(d === "b64ToHex" ? "SGVsbG8=" : "48656c6c6f");
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["b64ToHex", "hexToB64"] as Direction[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => switchDir(d)}
            aria-pressed={direction === d}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              direction === d
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d === "b64ToHex" ? "Base64 → Hex" : "Hex → Base64"}
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor="bh-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          {direction === "b64ToHex" ? "Base64" : "Hex"}
        </label>
        <textarea
          id="bh-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className={`h-28 w-full resize-y break-all rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
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
              {direction === "b64ToHex" ? "Hex" : "Base64"}
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
          <div className="min-h-[3rem] w-full break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {result.value}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Converts the raw bytes directly between encodings — no intermediate text
        decoding, so binary data survives intact. Runs locally.
      </p>
    </div>
  );
};

export default Base64Hex;
