"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { encodeEntities, decodeEntities } from "./entities";

type Mode = "encode" | "decode";

const SAMPLE = '<a href="x?a=1&b=2">Tom & Jerry</a>';

const HtmlEntities = () => {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeAll, setEncodeAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () =>
      mode === "encode"
        ? encodeEntities(input, encodeAll)
        : decodeEntities(input),
    [input, mode, encodeAll]
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
    <div className="space-y-4">
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
        <button
          type="button"
          onClick={() => setMode((m) => (m === "encode" ? "decode" : "encode"))}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightLeft className="h-3 w-3" /> Swap
        </button>
        {mode === "encode" && (
          <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <input
              type="checkbox"
              checked={encodeAll}
              onChange={(e) => setEncodeAll(e.target.checked)}
              className="h-3.5 w-3.5 accent-accent"
            />
            Encode non-ASCII
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="ent-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {mode === "encode" ? "Raw text" : "Encoded"}
          </label>
          <textarea
            id="ent-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="ent-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {mode === "encode" ? "Encoded" : "Decoded"}
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
            id="ent-output"
            value={output}
            readOnly
            spellCheck={false}
            className="h-56 w-full resize-y break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Encodes the five HTML-significant characters (
        <code className="text-foreground">&amp; &lt; &gt; &quot; &#39;</code>),
        and optionally all non-ASCII as numeric entities. Decoding handles named
        and numeric (decimal &amp; hex) entities. All local.
      </p>
    </div>
  );
};

export default HtmlEntities;
