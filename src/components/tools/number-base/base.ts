export interface BaseValues {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
}

/** Parse a string in the given base into a BigInt. Returns null if invalid. */
export function parseInBase(value: string, base: number): bigint | null {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return null;

  const negative = trimmed.startsWith("-");
  const digits = negative ? trimmed.slice(1) : trimmed;
  if (!digits) return null;

  const valid =
    base <= 10
      ? new RegExp(`^[0-${base - 1}]+$`)
      : new RegExp(`^[0-9a-${String.fromCharCode(96 + base - 10)}]+$`);
  if (!valid.test(digits)) return null;

  let result = BigInt(0);
  const bigBase = BigInt(base);
  for (const ch of digits) {
    const d = parseInt(ch, 36);
    if (Number.isNaN(d) || d >= base) return null;
    result = result * bigBase + BigInt(d);
  }
  return negative ? -result : result;
}

export function toBase(value: bigint, base: number): string {
  return value.toString(base);
}

export function allBases(value: bigint): BaseValues {
  return {
    binary: value.toString(2),
    octal: value.toString(8),
    decimal: value.toString(10),
    hex: value.toString(16),
  };
}
