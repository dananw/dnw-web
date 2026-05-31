"use client";

import { useMemo, useState } from "react";
import { inspect } from "./unicode";

const UnicodeInspector = () => {
  const [input, setInput] = useState("Hé✓🚀");
  const chars = useMemo(() => inspect(input), [input]);

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="uni-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Text
        </label>
        <input
          id="uni-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-lg text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {chars.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-4 py-2.5 font-normal">Char</th>
                <th className="px-4 py-2.5 font-normal">Code point</th>
                <th className="px-4 py-2.5 font-normal">Decimal</th>
                <th className="px-4 py-2.5 font-normal">Entity</th>
                <th className="px-4 py-2.5 font-normal">UTF-8</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono text-sm">
              {chars.map((c, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-lg text-foreground">{c.char}</td>
                  <td className="px-4 py-2.5 text-accent">{c.hex}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.decimal}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.htmlEntity}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{c.utf8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Splits text by Unicode code point (so emoji and combined characters stay
        whole) and shows the hex, decimal, HTML entity and UTF-8 bytes for each.
        Runs locally.
      </p>
    </div>
  );
};

export default UnicodeInspector;
