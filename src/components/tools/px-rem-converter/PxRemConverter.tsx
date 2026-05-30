"use client";

import { useState } from "react";
import { DEFAULT_BASE, pxToRem, remToPx, referenceTable } from "./pxrem";

const PxRemConverter = () => {
  const [base, setBase] = useState(DEFAULT_BASE);
  const [px, setPx] = useState("16");
  const [rem, setRem] = useState("1");

  const onPx = (v: string) => {
    setPx(v);
    setRem(v === "" ? "" : pxToRem(Number(v), base));
  };
  const onRem = (v: string) => {
    setRem(v);
    setPx(v === "" ? "" : remToPx(Number(v), base));
  };
  const onBase = (v: number) => {
    const next = v || DEFAULT_BASE;
    setBase(next);
    // Recompute rem from the current px against the new base.
    if (px !== "") setRem(pxToRem(Number(px), next));
  };

  const table = referenceTable(base);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="rem-base"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Root font size (px)
        </label>
        <input
          id="rem-base"
          type="number"
          min={1}
          value={base}
          onChange={(e) => onBase(Number(e.target.value))}
          className="w-32 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label
            htmlFor="rem-px"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Pixels
          </label>
          <div className="flex items-center rounded-lg border border-border bg-card pr-4 transition-colors focus-within:border-accent/60">
            <input
              id="rem-px"
              type="number"
              step="any"
              value={px}
              onChange={(e) => onPx(e.target.value)}
              className="w-full bg-transparent px-4 py-3 font-mono text-sm text-foreground outline-none"
            />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              px
            </span>
          </div>
        </div>

        <span className="hidden pb-3 text-center font-mono text-muted-foreground sm:block">
          ↔
        </span>

        <div>
          <label
            htmlFor="rem-rem"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Rem
          </label>
          <div className="flex items-center rounded-lg border border-border bg-card pr-4 transition-colors focus-within:border-accent/60">
            <input
              id="rem-rem"
              type="number"
              step="any"
              value={rem}
              onChange={(e) => onRem(e.target.value)}
              className="w-full bg-transparent px-4 py-3 font-mono text-sm text-foreground outline-none"
            />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              rem
            </span>
          </div>
        </div>
      </div>

      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Reference ({base}px base)
        </span>
        <div className="grid grid-cols-2 gap-x-4 overflow-hidden rounded-lg border border-border sm:grid-cols-3">
          {table.map((row) => (
            <div
              key={row.px}
              className="flex items-center justify-between border-b border-border/60 px-4 py-2 font-mono text-sm"
            >
              <span className="text-muted-foreground">{row.px}px</span>
              <span className="text-foreground">{row.rem}rem</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Edit either field and the other follows, using the root font size above
        (browsers default to <code className="text-foreground">16px</code>). All
        local.
      </p>
    </div>
  );
};

export default PxRemConverter;
