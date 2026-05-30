"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ArrowRightLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonToCsv, csvToJson } from "./convert";

type Direction = "json2csv" | "csv2json";

const SAMPLE_JSON = `[
  { "name": "Ada", "role": "Engineer", "age": 36 },
  { "name": "Linus", "role": "Maintainer", "age": 54 }
]`;

const JsonCsv = () => {
  const [dir, setDir] = useState<Direction>("json2csv");
  const [input, setInput] = useState(SAMPLE_JSON);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (dir === "json2csv" ? jsonToCsv(input) : csvToJson(input)),
    [input, dir]
  );

  const swap = () => {
    if (result.ok && result.output) setInput(result.output);
    setDir((d) => (d === "json2csv" ? "csv2json" : "json2csv"));
  };

  const handleCopy = async () => {
    if (!result.ok || !result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const [fromLabel, toLabel] =
    dir === "json2csv" ? ["JSON", "CSV"] : ["CSV", "JSON"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setDir("json2csv")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              dir === "json2csv"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            JSON → CSV
          </button>
          <button
            type="button"
            onClick={() => setDir("csv2json")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              dir === "csv2json"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            CSV → JSON
          </button>
        </div>
        <button
          type="button"
          onClick={swap}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightLeft className="h-3 w-3" /> Swap
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="jc-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {fromLabel}
          </label>
          <textarea
            id="jc-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className={`h-96 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="jc-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {toLabel}
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.ok || !result.output}
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
            id="jc-output"
            value={result.ok ? result.output : ""}
            readOnly
            spellCheck={false}
            className="h-96 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            <span className="font-medium">Can&apos;t convert.</span>{" "}
            {result.error}
          </span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        JSON must be an array of objects. Headers are the union of all keys;
        nested values are stored as JSON strings. CSV parsing handles quoted
        cells and escaped quotes. All local.
      </p>
    </div>
  );
};

export default JsonCsv;
