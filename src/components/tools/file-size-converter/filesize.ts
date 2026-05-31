export type UnitSystem = "decimal" | "binary";

export interface UnitDef {
  symbol: string;
  /** Number of bytes in one of this unit. */
  bytes: number;
  system: UnitSystem;
}

const DECIMAL = 1000;
const BINARY = 1024;

/** Ordered units used both for the input selector and the results table. */
export const UNITS: UnitDef[] = [
  { symbol: "B", bytes: 1, system: "decimal" },
  { symbol: "KB", bytes: DECIMAL ** 1, system: "decimal" },
  { symbol: "MB", bytes: DECIMAL ** 2, system: "decimal" },
  { symbol: "GB", bytes: DECIMAL ** 3, system: "decimal" },
  { symbol: "TB", bytes: DECIMAL ** 4, system: "decimal" },
  { symbol: "PB", bytes: DECIMAL ** 5, system: "decimal" },
  { symbol: "KiB", bytes: BINARY ** 1, system: "binary" },
  { symbol: "MiB", bytes: BINARY ** 2, system: "binary" },
  { symbol: "GiB", bytes: BINARY ** 3, system: "binary" },
  { symbol: "TiB", bytes: BINARY ** 4, system: "binary" },
  { symbol: "PiB", bytes: BINARY ** 5, system: "binary" },
];

export function unitBySymbol(symbol: string): UnitDef | undefined {
  return UNITS.find((u) => u.symbol === symbol);
}

export interface ToBytesResult {
  ok: boolean;
  bytes: number;
}

/** Convert a value expressed in `symbol` units to a raw byte count. */
export function toBytes(value: number, symbol: string): ToBytesResult {
  const unit = unitBySymbol(symbol);
  if (!unit || !Number.isFinite(value) || value < 0) {
    return { ok: false, bytes: 0 };
  }
  return { ok: true, bytes: value * unit.bytes };
}

/** Format a number with up to `max` decimals — no thousands separators or
 *  scientific notation — trimming trailing zeros so it stays copy-friendly. */
export function formatNumber(n: number, max = 6): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (n >= 1) {
    return Number(n.toFixed(max)).toString();
  }
  // Sub-1 values: keep `max` significant digits, expanded out of exponent form.
  const rounded = Number(n.toPrecision(max));
  if (rounded === 0) return "0";
  let s = rounded.toString();
  if (/e/i.test(s)) {
    const decimals = Math.abs(Math.floor(Math.log10(rounded))) + max;
    s = rounded
      .toFixed(Math.min(decimals, 100))
      .replace(/0+$/, "")
      .replace(/\.$/, "");
  }
  return s;
}

export interface ConversionRow {
  symbol: string;
  system: UnitSystem;
  value: string;
}

/** Express a byte count in every supported unit. */
export function convertAll(bytes: number): ConversionRow[] {
  return UNITS.map((u) => ({
    symbol: u.symbol,
    system: u.system,
    value: formatNumber(bytes / u.bytes),
  }));
}

/** Total number of bits for a byte count. */
export function toBits(bytes: number): string {
  return formatNumber(bytes * 8, 0);
}
