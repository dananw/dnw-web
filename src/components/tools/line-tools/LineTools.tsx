"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  sortAsc,
  sortDesc,
  dedupe,
  reverse,
  shuffle,
  trimEach,
  removeEmpty,
} from "./lines";

const SAMPLE = `banana
apple
cherry
apple
  date  
banana`;

const ACTIONS: { label: string; fn: (t: string) => string }[] = [
  { label: "Sort A→Z", fn: sortAsc },
  { label: "Sort Z→A", fn: sortDesc },
  { label: "Dedupe", fn: dedupe },
  { label: "Reverse", fn: reverse },
  { label: "Shuffle", fn: shuffle },
  { label: "Trim each", fn: trimEach },
  { label: "Remove empty", fn: removeEmpty },
];

const LineTools = () => {
  const [text, setText] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const apply = (fn: (t: string) => string) => setText(fn(text));

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const lineCount = text ? text.replace(/\r\n/g, "\n").split("\n").length : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <Button
            key={a.label}
            size="sm"
            variant="secondary"
            onClick={() => apply(a.fn)}
          >
            {a.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {lineCount} lines
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleCopy}
          disabled={!text}
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        placeholder="One item per line…"
        className="h-96 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
      />

      <p className="text-sm text-muted-foreground">
        Operations apply in place to the text above, so you can chain them (sort,
        then dedupe, then trim). All local.
      </p>
    </div>
  );
};

export default LineTools;
