"use client";

import { useMemo, useState } from "react";
import { cssSpecificity } from "./specificity";

const EXAMPLES = ["#nav .item a", "ul li.active", "a:hover", "div::before", ".btn.btn-primary"];

const CssSpecificity = () => {
  const [selector, setSelector] = useState("#nav ul li.active a:hover");
  const result = useMemo(() => cssSpecificity(selector), [selector]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="spec-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          CSS selector
        </label>
        <input
          id="spec-input"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setSelector(ex)}
              className="rounded-lg border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-6 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Specificity
            </span>
            <p className="mt-2 font-display text-4xl tracking-tight text-foreground">
              {result.a},{result.b},{result.c}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "IDs", value: result.a },
              { label: "Classes / attrs / pseudo-classes", value: result.b },
              { label: "Elements / pseudo-elements", value: result.c },
            ].map((part) => (
              <div key={part.label} className="rounded-lg border border-border px-3 py-3 text-center">
                <div className="font-mono text-2xl text-foreground">{part.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {part.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Specificity is compared left to right: more IDs always beats more
        classes, which always beats more elements. <code className="text-foreground">:where()</code>{" "}
        counts as zero. For selector lists, the most specific one is shown. Runs locally.
      </p>
    </div>
  );
};

export default CssSpecificity;
