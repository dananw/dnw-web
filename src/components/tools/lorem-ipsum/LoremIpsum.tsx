"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateLorem, type LoremUnit } from "./lorem";

const UNITS: LoremUnit[] = ["paragraphs", "sentences", "words"];

const LoremIpsum = () => {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [classic, setClassic] = useState(true);
  const [output, setOutput] = useState(() =>
    generateLorem(3, "paragraphs", true)
  );
  const [copied, setCopied] = useState(false);

  const regenerate = (
    nextCount = count,
    nextUnit = unit,
    nextClassic = classic
  ) => setOutput(generateLorem(nextCount, nextUnit, nextClassic));

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
          Count
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => {
              const c = Number(e.target.value) || 1;
              setCount(c);
              regenerate(c);
            }}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>

        <div className="inline-flex rounded-lg border border-border p-1">
          {UNITS.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => {
                setUnit(u);
                regenerate(count, u);
              }}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] capitalize transition-colors ${
                unit === u
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={classic}
            onChange={(e) => {
              setClassic(e.target.checked);
              regenerate(count, unit, e.target.checked);
            }}
            className="h-3.5 w-3.5 accent-accent"
          />
          Start with “Lorem ipsum”
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={() => regenerate()} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <textarea
        value={output}
        readOnly
        spellCheck={false}
        className="h-80 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground outline-none"
      />

      <p className="text-sm text-muted-foreground">
        Generate up to 100 paragraphs, sentences or words of placeholder text.
        All local.
      </p>
    </div>
  );
};

export default LoremIpsum;
