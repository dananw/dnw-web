"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { HASH_ALGOS, hashAll, type HashAlgo } from "./hash";

const SAMPLE = "The quick brown fox jumps over the lazy dog";

const empty = Object.fromEntries(HASH_ALGOS.map((a) => [a, ""])) as Record<
  HashAlgo,
  string
>;

const HashGenerator = () => {
  const [input, setInput] = useState(SAMPLE);
  const [hashes, setHashes] = useState<Record<HashAlgo, string>>(empty);
  const [copied, setCopied] = useState<HashAlgo | null>(null);

  useEffect(() => {
    let active = true;
    if (!input) {
      setHashes(empty);
      return;
    }
    hashAll(input).then((result) => {
      if (active) setHashes(result);
    });
    return () => {
      active = false;
    };
  }, [input]);

  const handleCopy = async (algo: HashAlgo, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(algo);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="hash-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Input text
        </label>
        <textarea
          id="hash-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Type or paste text to hash…"
          className="h-32 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="space-y-3">
        {HASH_ALGOS.map((algo) => (
          <div key={algo}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                {algo}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(algo, hashes[algo])}
                disabled={!hashes[algo]}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                {copied === algo ? (
                  <>
                    <Check className="h-3 w-3 text-accent" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy
                  </>
                )}
              </button>
            </div>
            <p className="break-all rounded-lg border border-border bg-muted/40 p-3 font-mono text-sm text-foreground">
              {hashes[algo] || (
                <span className="text-muted-foreground/50">—</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Computed with the browser&apos;s built-in Web Crypto API — no libraries,
        nothing leaves your device. Note: MD5 isn&apos;t offered because it
        isn&apos;t supported by Web Crypto (and isn&apos;t safe for security
        use).
      </p>
    </div>
  );
};

export default HashGenerator;
