"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  UNITS,
  toBytes,
  convertAll,
  toBits,
  type ConversionRow,
} from "./filesize";

const FileSizeConverter = () => {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState("MiB");
  const [copied, setCopied] = useState<string | null>(null);

  const { ok, bytes } = useMemo(
    () => toBytes(Number(value), unit),
    [value, unit]
  );

  const rows = useMemo(() => (ok ? convertAll(bytes) : []), [ok, bytes]);
  const decimal = rows.filter((r) => r.system === "decimal");
  const binary = rows.filter((r) => r.system === "binary");

  const copy = async (row: ConversionRow) => {
    try {
      await navigator.clipboard.writeText(row.value);
      setCopied(row.symbol);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  const renderColumn = (label: string, list: ConversionRow[]) => (
    <div>
      <div className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
      <div className="divide-y divide-border/60 rounded-lg border border-border">
        {list.map((row) => (
          <button
            key={row.symbol}
            type="button"
            onClick={() => copy(row)}
            className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/40"
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {row.symbol}
            </span>
            <span className="flex items-center gap-2 font-mono text-sm text-foreground">
              {row.value}
              {copied === row.symbol && (
                <Check className="h-3.5 w-3.5 text-accent" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1">
          <label
            htmlFor="size-value"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Value
          </label>
          <input
            id="size-value"
            type="number"
            min={0}
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <label
            htmlFor="size-unit"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Unit
          </label>
          <select
            id="size-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
          >
            {UNITS.map((u) => (
              <option key={u.symbol} value={u.symbol}>
                {u.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {ok ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {renderColumn("Decimal (SI · ×1000)", decimal)}
            {renderColumn("Binary (IEC · ×1024)", binary)}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Bits
            </span>
            <span className="font-mono text-sm text-foreground">
              {toBits(bytes)} bit
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Enter a non-negative number to see the conversions.
        </p>
      )}

      <p className="text-sm text-muted-foreground">
        Decimal units (KB, MB, GB) use powers of 1000; binary units (KiB, MiB,
        GiB) use powers of 1024. Tap any value to copy it. Runs locally.
      </p>
    </div>
  );
};

export default FileSizeConverter;
