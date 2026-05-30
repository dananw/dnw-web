"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "./slug";

const SAMPLE = "Héllo World! This is My Café & Bar (2024)";

const SEPARATORS = [
  { key: "-", label: "Hyphen -" },
  { key: "_", label: "Underscore _" },
];

const SlugGenerator = () => {
  const [input, setInput] = useState(SAMPLE);
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(
    () => slugify(input, { separator, lowercase }),
    [input, separator, lowercase]
  );

  const handleCopy = async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="slug-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Title
        </label>
        <input
          id="slug-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Enter a title…"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {SEPARATORS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSeparator(s.key)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                separator === s.key
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="h-3.5 w-3.5 accent-accent"
          />
          Lowercase
        </label>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Slug
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!slug}
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
        <p className="min-h-[3.25rem] break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-base text-foreground">
          {slug || <span className="text-muted-foreground/50">—</span>}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Accents are transliterated (café → cafe), symbols dropped, and spaces
        collapsed into your chosen separator. All local.
      </p>
    </div>
  );
};

export default SlugGenerator;
