const NUMERALS: { value: number; symbol: string }[] = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

export interface RomanResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Convert an integer (1-3999) to a Roman numeral. */
export function toRoman(n: number): RomanResult {
  if (!Number.isInteger(n)) return { ok: false, value: "", error: "Enter a whole number" };
  if (n < 1 || n > 3999) {
    return { ok: false, value: "", error: "Number must be between 1 and 3999" };
  }
  let remaining = n;
  let out = "";
  for (const { value, symbol } of NUMERALS) {
    while (remaining >= value) {
      out += symbol;
      remaining -= value;
    }
  }
  return { ok: true, value: out };
}

/** Convert a Roman numeral back to an integer, validating canonical form. */
export function fromRoman(input: string): RomanResult {
  const s = input.trim().toUpperCase();
  if (!s) return { ok: true, value: "" };
  if (!/^[MDCLXVI]+$/.test(s)) {
    return { ok: false, value: "", error: "Only the letters M, D, C, L, X, V, I are allowed" };
  }
  let i = 0;
  let total = 0;
  for (const { value, symbol } of NUMERALS) {
    while (s.startsWith(symbol, i)) {
      total += value;
      i += symbol.length;
    }
  }
  if (i !== s.length) {
    return { ok: false, value: "", error: "Not a valid Roman numeral" };
  }
  // Round-trip check rejects non-canonical forms like "IIII" or "VV".
  const back = toRoman(total);
  if (!back.ok || back.value !== s) {
    return { ok: false, value: "", error: "Not a valid Roman numeral" };
  }
  return { ok: true, value: String(total) };
}
