"use client";

import { useMemo, useState } from "react";
import { Check, Copy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { encodeBase64, decodeBase64 } from "./base64";

type Mode = "encode" | "decode";

const SAMPLE = "Hello, Danan! 👋";

const Base64Tool = () => {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (mode === "encode") {
      return { output: encodeBase64(input, urlSafe), error: false };
    }
    const r = decodeBase64(input);
    return { output: r.value, error: !r.ok };
  }, [input, mode, urlSafe]);

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {(["encode", "decode"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] capitalize transition-colors ${
                mode === m
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === "encode" && (
          <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="h-3.5 w-3.5 accent-accent"
            />
            URL-safe
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="b64-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {mode === "encode" ? "Plain text" : "Base64"}
          </label>
          <textarea
            id="b64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="b64-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {mode === "encode" ? "Base64" : "Plain text"}
            </label>
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
          <textarea
            id="b64-output"
            value={output}
            readOnly
            spellCheck={false}
            className={`h-56 w-full resize-y break-all rounded-lg border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none ${
              error ? "border-destructive/70" : "border-border"
            }`}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>That doesn&apos;t look like valid Base64.</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Full UTF-8 support, including emoji. URL-safe mode swaps{" "}
        <code className="text-foreground">+/</code> for{" "}
        <code className="text-foreground">-_</code> and drops padding.
        Everything runs locally.
      </p>
    </div>
  );
};

export default Base64Tool;
