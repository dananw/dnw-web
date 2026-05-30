"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateUlids } from "./ulid";

const UlidGenerator = () => {
  const [count, setCount] = useState(5);
  const [lowercase, setLowercase] = useState(false);
  const [ulids, setUlids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const regenerate = () => setUlids(generateUlids(count));

  // Generate on mount and whenever the count changes.
  useEffect(() => {
    setUlids(generateUlids(count));
  }, [count]);

  const display = lowercase ? ulids.map((u) => u.toLowerCase()) : ulids;

  const handleCopyAll = async () => {
    if (!display.length) return;
    try {
      await navigator.clipboard.writeText(display.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Count
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          Lowercase
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={regenerate} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyAll}
            disabled={!display.length}
            className="gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy all
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {display.map((u, i) => (
          <div
            key={`${u}-${i}`}
            className="px-4 py-2.5 font-mono text-sm text-foreground"
          >
            {u}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        ULIDs are 26-character, Crockford base32 identifiers: a 48-bit timestamp
        followed by 80 bits of secure randomness, so they sort by creation time.
        Generated locally with the Web Crypto API.
      </p>
    </div>
  );
};

export default UlidGenerator;
