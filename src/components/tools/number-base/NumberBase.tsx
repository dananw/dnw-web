"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { parseInBase, allBases, type BaseValues } from "./base";

type Field = keyof BaseValues;

const BASES: { key: Field; label: string; base: number }[] = [
  { key: "binary", label: "Binary (2)", base: 2 },
  { key: "octal", label: "Octal (8)", base: 8 },
  { key: "decimal", label: "Decimal (10)", base: 10 },
  { key: "hex", label: "Hexadecimal (16)", base: 16 },
];

const empty: BaseValues = { binary: "", octal: "", decimal: "", hex: "" };

const NumberBase = () => {
  const [values, setValues] = useState<BaseValues>(() => {
    const v = BigInt(255);
    return allBases(v);
  });
  const [invalid, setInvalid] = useState<Field | null>(null);
  const [copied, setCopied] = useState<Field | null>(null);

  const handleChange = (field: Field, raw: string, base: number) => {
    if (!raw.trim()) {
      setValues(empty);
      setInvalid(null);
      return;
    }
    const parsed = parseInBase(raw, base);
    if (parsed === null) {
      // Keep the typed value in its own field, blank the others.
      setValues({ ...empty, [field]: raw });
      setInvalid(field);
      return;
    }
    setInvalid(null);
    setValues({ ...allBases(parsed), [field]: raw.trim().toLowerCase() });
  };

  const copy = async (field: Field, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {BASES.map((b) => (
          <div key={b.key}>
            <label
              htmlFor={`base-${b.key}`}
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              {b.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                id={`base-${b.key}`}
                value={values[b.key]}
                onChange={(e) => handleChange(b.key, e.target.value, b.base)}
                spellCheck={false}
                className={`flex-1 rounded-lg border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60 ${
                  invalid === b.key ? "border-destructive/70" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={() => copy(b.key, values[b.key])}
                disabled={!values[b.key]}
                aria-label={`Copy ${b.label}`}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-40"
              >
                {copied === b.key ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Edit any field and the others update instantly. Uses BigInt, so
        arbitrarily large integers work. All local.
      </p>
    </div>
  );
};

export default NumberBase;
