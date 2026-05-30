"use client";

import { useMemo, useState } from "react";
import { analyze } from "./count";

const SAMPLE =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

const WordCounter = () => {
  const [text, setText] = useState(SAMPLE);
  const stats = useMemo(() => analyze(text), [text]);

  const cards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Chars (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading time", value: stats.readingTime },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="wc-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Text
        </label>
        <textarea
          id="wc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          placeholder="Start typing or paste text…"
          className="h-64 w-full resize-y rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="font-display text-3xl tracking-tight text-foreground">
              {c.value}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {c.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Reading time assumes ~200 words per minute. Counts update as you type.
        All local.
      </p>
    </div>
  );
};

export default WordCounter;
