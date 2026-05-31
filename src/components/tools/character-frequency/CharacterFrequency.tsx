"use client";

import { useMemo, useState } from "react";
import { analyzeFrequency, type FrequencyMode } from "./charFrequency";

const MODES: { value: FrequencyMode; label: string }[] = [
  { value: "char", label: "Characters" },
  { value: "word", label: "Words" },
  { value: "line", label: "Lines" },
];

const display = (key: string, mode: FrequencyMode) => {
  if (mode !== "char") return key;
  if (key === " ") return "Space";
  if (key === "\t") return "Tab";
  return key;
};

const CharacterFrequency = () => {
  const [input, setInput] = useState("the quick brown fox jumps over the lazy dog");
  const [mode, setMode] = useState<FrequencyMode>("char");

  const rows = useMemo(() => analyzeFrequency(input, mode), [input, mode]);
  const max = rows.length ? rows[0].count : 0;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-border p-1">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMode(m.value)}
            aria-pressed={mode === m.value}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
              mode === m.value
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        aria-label="Text to analyze"
        className="h-28 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
      />

      {rows.length > 0 ? (
        <div className="space-y-1.5">
          {rows.slice(0, 40).map((row) => (
            <div key={row.key} className="flex items-center gap-3">
              <span className="w-24 flex-shrink-0 truncate font-mono text-sm text-foreground">
                {display(row.key, mode)}
              </span>
              <div className="h-5 flex-1 overflow-hidden rounded bg-muted">
                <div
                  className="h-full rounded bg-accent/70"
                  style={{ width: `${max ? (row.count / max) * 100 : 0}%` }}
                />
              </div>
              <span className="w-20 flex-shrink-0 text-right font-mono text-xs text-muted-foreground">
                {row.count} · {row.percent}%
              </span>
            </div>
          ))}
          {rows.length > 40 && (
            <p className="pt-1 font-mono text-xs text-muted-foreground">
              +{rows.length - 40} more
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Type something to analyze.</p>
      )}

      <p className="text-sm text-muted-foreground">
        Counts how often each character, word or line appears, sorted most-first.
        Word mode is case-insensitive. Runs locally.
      </p>
    </div>
  );
};

export default CharacterFrequency;
