"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { CATEGORIES, convertAll, unitsFor, type Category } from "./units";

const DEFAULT_UNIT: Record<Category, string> = {
  length: "m",
  weight: "kg",
  temperature: "C",
};

const UnitConverter = () => {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [copied, setCopied] = useState<string | null>(null);

  const rows = useMemo(
    () => convertAll(category, Number(value), from),
    [category, value, from]
  );

  const switchCategory = (c: Category) => {
    setCategory(c);
    setFrom(DEFAULT_UNIT[c]);
  };

  const copy = async (text: string, unit: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(unit);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg border border-border p-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => switchCategory(c)}
            aria-pressed={category === c}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase capitalize tracking-[0.12em] transition-colors ${
              category === c
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1">
          <label
            htmlFor="unit-value"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Value
          </label>
          <input
            id="unit-value"
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="unit-from"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            From
          </label>
          <select
            id="unit-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            {unitsFor(category).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {rows.map((row) => (
          <button
            key={row.unit}
            type="button"
            onClick={() => copy(row.value, row.unit)}
            className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/40 ${
              row.unit === from ? "bg-muted/30" : ""
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {row.unit}
            </span>
            <span className="flex items-center gap-2 font-mono text-sm text-foreground">
              {row.value}
              {copied === row.unit && <Check className="h-3.5 w-3.5 text-accent" />}
            </span>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Pick a category and source unit; every equivalent updates instantly. Tap
        a row to copy its value. Runs locally.
      </p>
    </div>
  );
};

export default UnitConverter;
