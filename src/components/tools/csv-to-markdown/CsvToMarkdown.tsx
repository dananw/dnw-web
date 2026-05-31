"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { csvToMarkdown, type Alignment } from "./csvToMarkdown";

type DelimiterChoice = "auto" | "," | ";" | "\t" | "|";

const SAMPLE = `name,role,location
Danan,Full Stack Developer,Remote
Ada,Designer,"Jakarta, ID"`;

const DELIMITERS: { value: DelimiterChoice; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: ",", label: "Comma" },
  { value: ";", label: "Semicolon" },
  { value: "\t", label: "Tab" },
  { value: "|", label: "Pipe" },
];

const ALIGNMENTS: Alignment[] = ["left", "center", "right"];

const CsvToMarkdown = () => {
  const [input, setInput] = useState(SAMPLE);
  const [header, setHeader] = useState(true);
  const [alignment, setAlignment] = useState<Alignment>("left");
  const [delimiter, setDelimiter] = useState<DelimiterChoice>("auto");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const d = delimiter === "auto" ? undefined : delimiter;
    return csvToMarkdown(input, { header, alignment }, d).value;
  }, [input, header, alignment, delimiter]);

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
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Delimiter
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as DelimiterChoice)}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {DELIMITERS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Align
          <div className="inline-flex rounded-lg border border-border p-1">
            {ALIGNMENTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlignment(a)}
                aria-pressed={alignment === a}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] capitalize transition-colors ${
                  alignment === a
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={header}
            onChange={(e) => setHeader(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          First row is header
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="csv-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            CSV
          </label>
          <textarea
            id="csv-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="csv-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Markdown
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
            id="csv-output"
            value={output}
            readOnly
            spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Quoted fields with embedded commas, and{" "}
        <code className="text-foreground">&quot;&quot;</code> escapes, are handled.
        Pipes in cells are escaped and newlines become{" "}
        <code className="text-foreground">&lt;br&gt;</code>. All local.
      </p>
    </div>
  );
};

export default CsvToMarkdown;
