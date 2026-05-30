"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildBasicAuth } from "./basicAuth";

const BasicAuthGenerator = () => {
  const [username, setUsername] = useState("aladdin");
  const [password, setPassword] = useState("open sesame");
  const [copied, setCopied] = useState<"header" | "token" | null>(null);

  const result = useMemo(
    () => buildBasicAuth(username, password),
    [username, password]
  );

  const copy = async (which: "header" | "token", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ba-user"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Username
          </label>
          <input
            id="ba-user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="ba-pass"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Password
          </label>
          <input
            id="ba-pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Authorization header
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => copy("header", result.header)}
            className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {copied === "header" ? (
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
        <div className="break-all rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
          {result.header}
        </div>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Base64 token
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => copy("token", result.token)}
            className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {copied === "token" ? (
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
        <div className="break-all rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-sm text-foreground">
          {result.token}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        The credentials are Base64-encoded (UTF-8), not encrypted — Basic Auth is
        only safe over HTTPS. Encoding happens locally; nothing is sent anywhere.
      </p>
    </div>
  );
};

export default BasicAuthGenerator;
