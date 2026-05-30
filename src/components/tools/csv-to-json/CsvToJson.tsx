"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { csvToJson } from "./csvToJson";

const SAMPLE = `name,role,city
Danan,Developer,Remote
Ada,Designer,"Jakarta, ID"`;

const CsvToJson = () => {
  const [input, setInput] = useState(SAMPLE);
  const [header, setHeader] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => csvToJson(input, header), [input, header]);

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

  return (
    <div className="space-y-4">
      <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <input
          type="checkbox"
          checked={header}
          onChange={(e) => setHeader(e.target.checked)}
          className="h-3.5 w-3.5 accent-accent"
        />
        First row is header
      </label>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="c2j-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            CSV
          </label>
          <textarea
            id="c2j-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              JSON
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
          <textarea
            readOnly
            value={result.value}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        The delimiter is detected automatically and quoted fields with embedded
        commas are handled. Values stay as strings. Runs locally.
      </p>
    </div>
  );
};

export default CsvToJson;
