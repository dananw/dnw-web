"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  generatePassword,
  strengthFromEntropy,
  type PasswordOptions,
  type PasswordResult,
} from "./password";

type BoolKey = "lowercase" | "uppercase" | "numbers" | "symbols" | "excludeAmbiguous";

const CHARSET_OPTIONS: { key: BoolKey; label: string }[] = [
  { key: "lowercase", label: "Lowercase (a–z)" },
  { key: "uppercase", label: "Uppercase (A–Z)" },
  { key: "numbers", label: "Numbers (0–9)" },
  { key: "symbols", label: "Symbols (!@#$…)" },
  { key: "excludeAmbiguous", label: "Exclude look-alikes" },
];

const PasswordGenerator = () => {
  const [opts, setOpts] = useState<PasswordOptions>({
    length: 20,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [result, setResult] = useState<PasswordResult>({
    ok: true,
    password: "",
    entropy: 0,
  });
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => setResult(generatePassword(opts)), [opts]);

  // Regenerate on mount and whenever the options change.
  useEffect(() => {
    setResult(generatePassword(opts));
  }, [opts]);

  const strength = strengthFromEntropy(result.entropy);

  const handleCopy = async () => {
    if (!result.password) return;
    try {
      await navigator.clipboard.writeText(result.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const toggle = (key: BoolKey) =>
    setOpts((o) => ({ ...o, [key]: !o[key] }));

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <code className="flex-1 break-all font-mono text-lg leading-relaxed text-foreground">
            {result.ok && result.password
              ? result.password
              : "Select at least one character set"}
          </code>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCopy}
            disabled={!result.password}
            aria-label="Copy password"
            className="flex-shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={regenerate}
            aria-label="Regenerate"
            className="flex-shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i <= strength.level ? "bg-accent" : "bg-muted"
                )}
              />
            ))}
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {strength.label}
            {result.entropy > 0 && ` · ${result.entropy} bits`}
          </span>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="pw-length"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Length
          </label>
          <span className="font-mono text-sm text-foreground">{opts.length}</span>
        </div>
        <input
          id="pw-length"
          type="range"
          min={4}
          max={64}
          value={opts.length}
          onChange={(e) =>
            setOpts((o) => ({ ...o, length: Number(e.target.value) }))
          }
          className="w-full accent-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CHARSET_OPTIONS.map((opt) => (
          <label
            key={opt.key}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-accent/60"
          >
            <input
              type="checkbox"
              checked={opts[opt.key]}
              onChange={() => toggle(opt.key)}
              className="h-3.5 w-3.5 accent-accent"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Passwords are drawn from the Web Crypto API with rejection sampling to
        avoid bias. Nothing leaves your browser — refresh and it&apos;s gone.
      </p>
    </div>
  );
};

export default PasswordGenerator;
