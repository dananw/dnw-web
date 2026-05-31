"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTotp, type TotpResult } from "./totp";

const TotpGenerator = () => {
  const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP");
  const [period, setPeriod] = useState(30);
  const [digits, setDigits] = useState(6);
  const [result, setResult] = useState<TotpResult>({ ok: true, code: "", secondsRemaining: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    const compute = async () => {
      const r = await generateTotp(secret, { period, digits });
      if (active) setResult(r);
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [secret, period, digits]);

  const handleCopy = async () => {
    if (!result.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const pct = period ? (result.secondsRemaining / period) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="totp-secret"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Base32 secret
        </label>
        <input
          id="totp-secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          spellCheck={false}
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-sm tracking-[0.15em] text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Digits
          <select
            value={digits}
            onChange={(e) => setDigits(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            <option value={6}>6</option>
            <option value={8}>8</option>
          </select>
        </label>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Period
          <input
            type="number"
            min={5}
            max={120}
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value) || 30)}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-center font-mono text-sm text-foreground outline-none focus:border-accent/60"
          />
          s
        </label>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-4xl tracking-[0.25em] text-foreground">
              {result.code || "------"}
            </span>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.code}
              aria-label="Copy code"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mx-auto mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Refreshes in {result.secondsRemaining}s
          </p>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Generates the same time-based codes as an authenticator app (RFC 6238,
        HMAC-SHA1). The secret stays in your browser — don&apos;t paste
        production secrets on a shared machine.
      </p>
    </div>
  );
};

export default TotpGenerator;
