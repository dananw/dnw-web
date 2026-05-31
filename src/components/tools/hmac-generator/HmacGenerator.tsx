"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hmac, HMAC_ALGOS, type HmacAlgo, type HmacResult } from "./hmac";

const HmacGenerator = () => {
  const [message, setMessage] = useState("The quick brown fox");
  const [key, setKey] = useState("secret");
  const [algo, setAlgo] = useState<HmacAlgo>("SHA-256");
  const [result, setResult] = useState<HmacResult>({ ok: true, hex: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    hmac(message, key, algo).then((r) => {
      if (active) setResult(r);
    });
    return () => {
      active = false;
    };
  }, [message, key, algo]);

  const handleCopy = async () => {
    if (!result.hex) return;
    try {
      await navigator.clipboard.writeText(result.hex);
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
          htmlFor="hmac-message"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="hmac-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          spellCheck={false}
          className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1">
          <label
            htmlFor="hmac-key"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Secret key
          </label>
          <input
            id="hmac-key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Algorithm
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as HmacAlgo)}
            className="rounded-md border border-border bg-card px-2 py-2.5 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {HMAC_ALGOS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              HMAC ({algo}) · hex
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.hex}
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
          <div className="min-h-[3rem] w-full break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {result.hex || (
              <span className="text-muted-foreground">Enter a secret key…</span>
            )}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Computed with the Web Crypto API entirely in your browser. The message
        and key never leave your device.
      </p>
    </div>
  );
};

export default HmacGenerator;
