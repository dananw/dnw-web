"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ArrowRightLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonToYaml, yamlToJson } from "./convert";

type Direction = "json2yaml" | "yaml2json";

const SAMPLE_JSON = `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": { "build": "next build" },
  "keywords": ["next", "react"]
}`;

const JsonYaml = () => {
  const [dir, setDir] = useState<Direction>("json2yaml");
  const [input, setInput] = useState(SAMPLE_JSON);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (dir === "json2yaml" ? jsonToYaml(input) : yamlToJson(input)),
    [input, dir]
  );

  const swap = () => {
    // When swapping, feed the current valid output back as the new input.
    if (result.ok && result.output) setInput(result.output);
    setDir((d) => (d === "json2yaml" ? "yaml2json" : "json2yaml"));
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
    dir === "json2yaml" ? ["JSON", "YAML"] : ["YAML", "JSON"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setDir("json2yaml")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              dir === "json2yaml"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            JSON → YAML
          </button>
          <button
            type="button"
            onClick={() => setDir("yaml2json")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              dir === "yaml2json"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            YAML → JSON
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
            htmlFor="jy-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {fromLabel}
          </label>
          <textarea
            id="jy-input"
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
              htmlFor="jy-output"
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
            id="jy-output"
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
            <span className="font-medium">Invalid {fromLabel}.</span>{" "}
            {result.error}
          </span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Powered by js-yaml, running locally. Comments are not preserved (YAML
        comments have no JSON equivalent).
      </p>
    </div>
  );
};

export default JsonYaml;
