"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { checkContrast } from "./contrast";

const ContrastChecker = () => {
  const [fg, setFg] = useState("#5b4a3a");
  const [bg, setBg] = useState("#faf6ef");

  const report = useMemo(() => checkContrast(fg, bg), [fg, bg]);

  const valid = report !== null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ColorField label="Foreground (text)" value={fg} onChange={setFg} />
        <ColorField label="Background" value={bg} onChange={setBg} />
      </div>

      {/* Live preview */}
      <div
        className="flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-lg border border-border p-6 text-center"
        style={
          valid
            ? { backgroundColor: bg, color: fg }
            : undefined
        }
      >
        {valid ? (
          <>
            <p className="text-2xl font-medium">Almost before we knew it</p>
            <p className="text-sm">Small text sample for contrast.</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter two valid hex colors (e.g. #1a1a1a).
          </p>
        )}
      </div>

      {report && (
        <>
          <div className="rounded-lg border border-border p-5 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Contrast ratio
            </p>
            <p className="mt-1 font-display text-5xl tracking-tight text-foreground">
              {report.ratio.toFixed(2)}
              <span className="text-2xl text-muted-foreground">:1</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Badge label="AA Normal" pass={report.aaNormal} />
            <Badge label="AA Large" pass={report.aaLarge} />
            <Badge label="AAA Normal" pass={report.aaaNormal} />
            <Badge label="AAA Large" pass={report.aaaLarge} />
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Ratios follow WCAG 2.1: AA needs 4.5:1 for normal text and 3:1 for large
        text; AAA needs 7:1 and 4.5:1. Large = 18pt+ or 14pt+ bold. All local.
      </p>
    </div>
  );
};

const ColorField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-12 flex-shrink-0 cursor-pointer rounded-md border border-border bg-card"
        aria-label={`${label} swatch`}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
      />
    </div>
  </div>
);

const Badge = ({ label, pass }: { label: string; pass: boolean }) => (
  <div
    className={`flex items-center justify-between rounded-lg border p-3 ${
      pass
        ? "border-green-500/40 bg-green-500/10"
        : "border-destructive/40 bg-destructive/10"
    }`}
  >
    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
      {label}
    </span>
    {pass ? (
      <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
    ) : (
      <X className="h-4 w-4 text-destructive" />
    )}
  </div>
);

export default ContrastChecker;
