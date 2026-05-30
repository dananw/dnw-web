"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { runRegex, highlightSegments } from "./regex";

const FLAGS = [
  { key: "g", label: "global" },
  { key: "i", label: "ignore case" },
  { key: "m", label: "multiline" },
  { key: "s", label: "dotall" },
  { key: "u", label: "unicode" },
] as const;

const SAMPLE_PATTERN = "(\\w+)@(\\w+)\\.(\\w+)";
const SAMPLE_TEXT =
  "Contact danan@example.com or sales@acme.org for details.";

const RegexTester = () => {
  const [pattern, setPattern] = useState(SAMPLE_PATTERN);
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(SAMPLE_TEXT);

  const result = useMemo(
    () => runRegex(pattern, flags, text),
    [pattern, flags, text]
  );
  const segments = useMemo(
    () => (result.ok ? highlightSegments(text, result.matches) : []),
    [text, result]
  );

  const toggleFlag = (key: string) =>
    setFlags((f) =>
      f.includes(key) ? f.replace(key, "") : f + key
    );

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="re-pattern"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Pattern
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-accent/60">
          <span className="font-mono text-muted-foreground">/</span>
          <input
            id="re-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent py-3 font-mono text-sm text-foreground outline-none"
          />
          <span className="font-mono text-muted-foreground">
            /{flags}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FLAGS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => toggleFlag(f.key)}
            className={`rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              flags.includes(f.key)
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.key} · {f.label}
          </button>
        ))}
      </div>

      {!result.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="re-text"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Test string
        </label>
        <textarea
          id="re-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="h-40 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {/* Highlighted preview */}
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Preview
        </p>
        <div className="min-h-[3rem] whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
          {result.ok && segments.length ? (
            segments.map((seg, i) =>
              seg.match ? (
                <mark
                  key={i}
                  className="rounded bg-accent/30 text-foreground"
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )
          ) : (
            <span className="text-muted-foreground/50">No matches</span>
          )}
        </div>
      </div>

      {/* Match details */}
      {result.ok && result.matches.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {result.matches.length} match
            {result.matches.length === 1 ? "" : "es"}
          </p>
          <div className="divide-y divide-border/60 rounded-lg border border-border">
            {result.matches.map((m, i) => (
              <div key={i} className="px-4 py-2.5 font-mono text-sm">
                <div className="flex gap-3">
                  <span className="text-muted-foreground">#{i + 1}</span>
                  <span className="text-foreground">{m.match}</span>
                  <span className="ml-auto text-muted-foreground/60">
                    at {m.index}
                  </span>
                </div>
                {m.groups.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-2 pl-7">
                    {m.groups.map((g, gi) => (
                      <span
                        key={gi}
                        className="rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        ${gi + 1}: {g || "∅"}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Uses the browser&apos;s native RegExp engine. Capture groups are listed
        per match; the global flag is always applied so every match is shown.
      </p>
    </div>
  );
};

export default RegexTester;
