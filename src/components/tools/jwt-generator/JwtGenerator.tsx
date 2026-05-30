"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signJwt, type JwtResult } from "./jwt";

const SAMPLE = `{
  "sub": "1234567890",
  "name": "Danan",
  "iat": 1516239022
}`;

const JwtGenerator = () => {
  const [payload, setPayload] = useState(SAMPLE);
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [result, setResult] = useState<JwtResult>({ ok: true, token: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    signJwt(payload, secret).then((r) => {
      if (active) setResult(r);
    });
    return () => {
      active = false;
    };
  }, [payload, secret]);

  const handleCopy = async () => {
    if (!result.token) return;
    try {
      await navigator.clipboard.writeText(result.token);
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
          htmlFor="jwt-payload"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Payload (JSON)
        </label>
        <textarea
          id="jwt-payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          spellCheck={false}
          className={`h-44 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="jwt-secret"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Secret
        </label>
        <input
          id="jwt-secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
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
              Token (HS256)
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.token}
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
          <div className="min-h-[5rem] w-full break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {result.token}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Signs with HMAC-SHA256 via the Web Crypto API, entirely in your browser —
        your secret never leaves the page. Use real secrets only on trusted
        machines.
      </p>
    </div>
  );
};

export default JwtGenerator;
