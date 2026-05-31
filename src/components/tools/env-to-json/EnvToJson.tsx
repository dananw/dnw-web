"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { envToJson, jsonToEnv } from "./envJson";

type Direction = "envToJson" | "jsonToEnv";

const SAMPLES: Record<Direction, string> = {
  envToJson: `# database
DB_HOST=localhost
DB_PORT=5432
APP_NAME="My App"`,
  jsonToEnv: `{
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "APP_NAME": "My App"
}`,
};

const EnvToJson = () => {
  const [direction, setDirection] = useState<Direction>("envToJson");
  const [input, setInput] = useState(SAMPLES.envToJson);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (direction === "envToJson" ? envToJson(input) : jsonToEnv(input)),
    [direction, input]
  );

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

  const switchDir = (d: Direction) => {
    setDirection(d);
    setInput(SAMPLES[d]);
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["envToJson", "jsonToEnv"] as Direction[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => switchDir(d)}
            aria-pressed={direction === d}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              direction === d
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d === "envToJson" ? ".env → JSON" : "JSON → .env"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="env-input"
            className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {direction === "envToJson" ? ".env" : "JSON"}
          </label>
          <textarea
            id="env-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className={`h-56 w-full resize-y rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60 ${
              result.ok ? "border-border" : "border-destructive/70"
            }`}
          />
        </div>
        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {direction === "envToJson" ? "JSON" : ".env"}
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
            className="h-56 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Comments and blank lines are ignored, and surrounding quotes are stripped
        from values. Everything stays a string. Runs locally.
      </p>
    </div>
  );
};

export default EnvToJson;
