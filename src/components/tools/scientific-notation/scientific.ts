export interface ConvertResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Expand a possibly-exponential number into a plain decimal string. */
function toPlain(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const s = String(n);
  if (!/e/i.test(s)) return s;
  return n.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: 20 });
}

/** Convert a plain decimal number into scientific (E) notation. */
export function toScientific(input: string): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (!/^-?\d*\.?\d+(e[-+]?\d+)?$/i.test(trimmed)) {
    return { ok: false, value: "", error: "Enter a valid number" };
  }
  const n = Number(trimmed);
  if (n === 0) return { ok: true, value: "0 × 10^0" };
  const exp = n.toExponential();
  const [mantissa, exponent] = exp.split("e");
  return { ok: true, value: `${mantissa} × 10^${parseInt(exponent, 10)}` };
}

/** Convert scientific notation (1.5e3 or 1.5 × 10^3) into a plain decimal. */
export function fromScientific(input: string): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  // Normalize the "× 10^" form into JS "e" notation.
  const normalized = trimmed.replace(/\s*[×x]\s*10\s*\^?\s*/i, "e").replace(/\s+/g, "");
  if (!/^-?\d*\.?\d+(e[-+]?\d+)?$/i.test(normalized)) {
    return { ok: false, value: "", error: "Enter valid scientific notation, e.g. 1.5e3" };
  }
  return { ok: true, value: toPlain(Number(normalized)) };
}
