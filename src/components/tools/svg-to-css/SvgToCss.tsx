"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { svgToCss } from "./svgToCss";

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea7a18" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;

const SvgToCss = () => {
  const [input, setInput] = useState(SAMPLE);
  const [base64, setBase64] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => svgToCss(input, base64), [input, base64]);

  const handleCopy = async () => {
    if (!result.css) return;
    try {
      await navigator.clipboard.writeText(result.css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          {[
            { value: false, label: "URL-encoded" },
            { value: true, label: "Base64" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setBase64(opt.value)}
              aria-pressed={base64 === opt.value}
              className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                base64 === opt.value
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {result.ok && result.dataUri && (
          <span
            className="ml-auto h-10 w-10 flex-shrink-0 rounded-lg border border-border bg-muted/40 bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${result.dataUri}")` }}
            aria-label="SVG preview"
          />
        )}
      </div>

      <div>
        <label
          htmlFor="svg-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          SVG markup
        </label>
        <textarea
          id="svg-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className={`h-40 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
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
              CSS background
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!result.css}
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
          <div className="max-h-40 overflow-auto break-all rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {result.css}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        URL-encoding keeps the data URI smaller and readable; Base64 is more
        widely compatible. Drop the result straight into a CSS{" "}
        <code className="text-foreground">background-image</code>. Runs locally.
      </p>
    </div>
  );
};

export default SvgToCss;
