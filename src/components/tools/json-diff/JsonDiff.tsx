"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { jsonDiff, type ChangeType } from "./jsonDiff";

const LEFT = `{
  "name": "Danan",
  "role": "dev",
  "tags": ["a", "b"]
}`;
const RIGHT = `{
  "name": "Danan",
  "role": "engineer",
  "tags": ["a", "c"],
  "active": true
}`;

const TYPE_STYLES: Record<ChangeType, string> = {
  added: "border-accent/50 bg-accent/10 text-accent",
  removed: "border-destructive/40 bg-destructive/10 text-destructive",
  changed: "border-border bg-muted/40 text-foreground",
};

const JsonDiff = () => {
  const [left, setLeft] = useState(LEFT);
  const [right, setRight] = useState(RIGHT);

  const result = useMemo(() => jsonDiff(left, right), [left, right]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="jd-left" className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Original
          </label>
          <textarea
            id="jd-left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label htmlFor="jd-right" className="mb-2 flex h-7 items-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Changed
          </label>
          <textarea
            id="jd-right"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : result.changes.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          The two documents are identical.
        </div>
      ) : (
        <div className="space-y-2">
          {result.changes.map((c, i) => (
            <div
              key={`${c.path}-${i}`}
              className={`rounded-lg border px-4 py-2.5 ${TYPE_STYLES[c.type]}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-80">
                  {c.type}
                </span>
                <span className="font-mono text-sm">{c.path}</span>
              </div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">
                {c.before !== undefined && <span className="line-through">{c.before}</span>}
                {c.before !== undefined && c.after !== undefined && " → "}
                {c.after !== undefined && <span className="text-foreground">{c.after}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Compares by structure and path (not line by line), so reordered keys and
        formatting don&apos;t create noise. Runs locally.
      </p>
    </div>
  );
};

export default JsonDiff;
