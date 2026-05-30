"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ShieldAlert, Clock } from "lucide-react";
import { decodeJwt } from "./decode";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmFuIFdpamF5YSIsImlhdCI6MTcwMDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const JwtDecoder = () => {
  const [token, setToken] = useState(SAMPLE);
  const result = useMemo(() => decodeJwt(token), [token]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="jwt-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Token
        </label>
        <textarea
          id="jwt-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
          placeholder="Paste a JWT (header.payload.signature)…"
          className="h-32 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.message}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                Header
              </p>
              <pre className="h-48 overflow-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
                {result.data.header}
              </pre>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                Payload
              </p>
              <pre className="h-48 overflow-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
                {result.data.payload}
              </pre>
            </div>
          </div>

          {(result.data.issuedAt || result.data.expiresAt) && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {result.data.issuedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Issued: {result.data.issuedAt}
                </span>
              )}
              {result.data.expiresAt && (
                <span
                  className={`inline-flex items-center gap-1.5 ${
                    result.data.expired ? "text-destructive" : ""
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  Expires: {result.data.expiresAt}
                  {result.data.expired ? " (expired)" : ""}
                </span>
              )}
            </div>
          )}
        </>
      )}

      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
        <span>
          Decoding only — the signature is <strong>not</strong> verified.
          Everything happens locally in your browser; the token never leaves
          your device. Never paste production secrets you don&apos;t trust this
          page with.
        </span>
      </div>
    </div>
  );
};

export default JwtDecoder;
