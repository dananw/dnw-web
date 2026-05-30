"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { encodeComponent, decodeComponent, parseUrl } from "./url";

type Mode = "encode" | "decode";

const SAMPLE = "https://example.com/search?q=hello world&lang=en#results";

const UrlEncoder = () => {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (mode === "encode" ? encodeComponent(input) : decodeComponent(input)),
    [input, mode]
  );

  const parsed = useMemo(() => parseUrl(input), [input]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              mode === "encode"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              mode === "decode"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Decode
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "encode" ? "decode" : "encode"))}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRightLeft className="h-3 w-3" /> Swap
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="url-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Input
          </label>
          <textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-40 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="url-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {mode === "encode" ? "Encoded" : "Decoded"}
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!output}
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
            id="url-output"
            value={output}
            readOnly
            spellCheck={false}
            className="h-40 w-full resize-y break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {/* URL breakdown */}
      {parsed.ok && (
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            URL breakdown
          </p>
          <div className="space-y-1.5 rounded-lg border border-border p-4 text-sm">
            {parsed.protocol && (
              <Row label="Protocol" value={parsed.protocol} />
            )}
            {parsed.host && <Row label="Host" value={parsed.host} />}
            {parsed.port && <Row label="Port" value={parsed.port} />}
            {parsed.pathname && <Row label="Path" value={parsed.pathname} />}
            {parsed.hash && <Row label="Fragment" value={parsed.hash} />}
          </div>

          {parsed.params.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                Query parameters ({parsed.params.length})
              </p>
              <div className="divide-y divide-border/60 rounded-lg border border-border">
                {parsed.params.map((p, i) => (
                  <div
                    key={`${p.key}-${i}`}
                    className="flex gap-4 px-4 py-2.5 font-mono text-sm"
                  >
                    <span className="w-40 flex-shrink-0 truncate text-accent">
                      {p.key}
                    </span>
                    <span className="min-w-0 break-all text-foreground">
                      {p.value || (
                        <span className="text-muted-foreground/50">(empty)</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Encoding uses <code className="text-foreground">encodeURIComponent</code>
        . The breakdown parses any absolute URL into its parts and decodes each
        query value for you. Everything runs locally.
      </p>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-4 font-mono">
    <span className="w-24 flex-shrink-0 text-muted-foreground">{label}</span>
    <span className="min-w-0 break-all text-foreground">{value}</span>
  </div>
);

export default UrlEncoder;
