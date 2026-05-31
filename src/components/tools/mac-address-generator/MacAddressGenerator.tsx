"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMacs, type MacOptions, type MacSeparator } from "./mac";

const SEPARATORS: { value: MacSeparator; label: string }[] = [
  { value: ":", label: "Colon" },
  { value: "-", label: "Hyphen" },
  { value: ".", label: "Dot" },
];

const MacAddressGenerator = () => {
  const [count, setCount] = useState(5);
  const [opts, setOpts] = useState<MacOptions>({
    separator: ":",
    uppercase: false,
    localUnicast: true,
  });
  const [macs, setMacs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const regenerate = () => setMacs(generateMacs(count, opts));

  useEffect(() => {
    setMacs(generateMacs(count, opts));
  }, [count, opts]);

  const handleCopyAll = async () => {
    if (!macs.length) return;
    try {
      await navigator.clipboard.writeText(macs.join("\n"));
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
            max={500}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
        </label>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Separator
          <select
            value={opts.separator}
            onChange={(e) =>
              setOpts((o) => ({ ...o, separator: e.target.value as MacSeparator }))
            }
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {SEPARATORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={opts.uppercase}
            onChange={(e) => setOpts((o) => ({ ...o, uppercase: e.target.checked }))}
            className="h-3.5 w-3.5 accent-accent"
          />
          Uppercase
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={opts.localUnicast}
            onChange={(e) =>
              setOpts((o) => ({ ...o, localUnicast: e.target.checked }))
            }
            className="h-3.5 w-3.5 accent-accent"
          />
          Local / unicast
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={regenerate} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopyAll}
          disabled={!macs.length}
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

      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {macs.map((m, i) => (
          <div key={`${m}-${i}`} className="px-4 py-2.5 font-mono text-sm text-foreground">
            {m}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        With “local / unicast” on, the address has the locally-administered bit
        set so it won&apos;t clash with a real vendor MAC. Generated locally with
        the Web Crypto API.
      </p>
    </div>
  );
};

export default MacAddressGenerator;
