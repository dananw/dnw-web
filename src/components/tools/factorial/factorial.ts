export interface FactorialResult {
  ok: boolean;
  value: string;
  digits: number;
  error?: string;
}

const MAX_N = 10000;

/** Compute n! exactly using big integers. */
export function factorial(input: string): FactorialResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "", digits: 0 };
  if (!/^\d+$/.test(trimmed)) {
    return { ok: false, value: "", digits: 0, error: "Enter a non-negative whole number" };
  }
  const n = Number(trimmed);
  if (n > MAX_N) {
    return { ok: false, value: "", digits: 0, error: `Keep n at or below ${MAX_N}` };
  }

  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  const value = result.toString();
  return { ok: true, value, digits: value.length };
}
