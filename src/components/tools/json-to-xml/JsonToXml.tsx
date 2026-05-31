"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonToXml } from "./jsonToXml";

const SAMPLE = `{
  "user": { "name": "Danan", "roles": ["admin", "editor"] },
  "active": true
}`;

const JsonToXml = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => jsonToXml(input), [input]);

  const handleCopy = async () => {
    if (!result.ok || !result.value) return;
    try {
      await navigator.clipboard.writeText(result.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="jx-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            JSON
          </label>
          <textarea
            id="jx-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className={`h-72 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              XML
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.ok || !result.value}
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
          <textarea
            readOnly
            value={result.ok ? result.value : ""}
            spellCheck={false}
            className="h-72 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            <span className="font-medium">Invalid JSON.</span> {result.error}
          </span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Arrays repeat their parent element; a top-level array is wrapped in{" "}
        <code className="text-foreground">&lt;item&gt;</code> elements. Keys are
        sanitized into valid XML names. Runs locally.
      </p>
    </div>
  );
};

export default JsonToXml;
