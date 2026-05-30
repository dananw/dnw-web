"use client";

import { useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { diffLines } from "./diff";

const SAMPLE_A = `function greet(name) {
  console.log("Hi " + name);
  return true;
}`;

const SAMPLE_B = `function greet(name) {
  console.log(\`Hi \${name}\`);
  return name.length > 0;
}`;

const TextDiff = () => {
  const [left, setLeft] = useState(SAMPLE_A);
  const [right, setRight] = useState(SAMPLE_B);

  const { lines, stats } = useMemo(() => diffLines(left, right), [left, right]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="diff-left"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Original
          </label>
          <textarea
            id="diff-left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="diff-right"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Changed
          </label>
          <textarea
            id="diff-right"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.12em]">
        <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500">
          <Plus className="h-3.5 w-3.5" /> {stats.added} added
        </span>
        <span className="inline-flex items-center gap-1.5 text-destructive">
          <Minus className="h-3.5 w-3.5" /> {stats.removed} removed
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <tbody>
              {lines.map((line, idx) => {
                const bg =
                  line.op === "add"
                    ? "bg-green-500/10"
                    : line.op === "remove"
                      ? "bg-destructive/10"
                      : "";
                const sign =
                  line.op === "add" ? "+" : line.op === "remove" ? "-" : " ";
                const signColor =
                  line.op === "add"
                    ? "text-green-600 dark:text-green-500"
                    : line.op === "remove"
                      ? "text-destructive"
                      : "text-muted-foreground/40";
                return (
                  <tr key={idx} className={bg}>
                    <td className="w-10 select-none border-r border-border/60 px-2 py-0.5 text-right text-muted-foreground/40">
                      {line.leftNo ?? ""}
                    </td>
                    <td className="w-10 select-none border-r border-border/60 px-2 py-0.5 text-right text-muted-foreground/40">
                      {line.rightNo ?? ""}
                    </td>
                    <td className={`w-6 select-none px-2 py-0.5 text-center ${signColor}`}>
                      {sign}
                    </td>
                    <td className="whitespace-pre-wrap break-all px-2 py-0.5 text-foreground">
                      {line.text || "\u00A0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Line-by-line comparison using an LCS diff. Green is added, red is
        removed. Runs entirely in your browser.
      </p>
    </div>
  );
};

export default TextDiff;
