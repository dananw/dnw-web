export type Radix = "binary" | "octal" | "decimal" | "hex";

export const RADICES: Radix[] = ["binary", "octal", "decimal", "hex"];

const BASE: Record<Radix, number> = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hex: 16,
};

const PAD: Record<Radix, number> = {
  binary: 8,
  octal: 3,
  decimal: 0,
  hex: 2,
};

const TOKEN: Record<Radix, RegExp> = {
  binary: /^[01]+$/,
  octal: /^[0-7]+$/,
  decimal: /^[0-9]+$/,
  hex: /^[0-9a-fA-F]+$/,
};

/** Encode text as space-separated byte values in the given radix (UTF-8). */
export function textToRadix(text: string, radix: Radix): string {
  if (!text) return "";
  const bytes = new TextEncoder().encode(text);
  const pad = PAD[radix];
  return Array.from(bytes)
    .map((b) => {
      const s = b.toString(BASE[radix]);
      return pad ? s.padStart(pad, "0") : s;
    })
    .join(" ");
}

export interface DecodeResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Decode space-separated byte values back into UTF-8 text. */
export function radixToText(input: string, radix: Radix): DecodeResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };

  const tokens = trimmed.split(/\s+/);
  const bytes: number[] = [];
  for (const tok of tokens) {
    if (!TOKEN[radix].test(tok)) {
      return { ok: false, value: "", error: `Invalid ${radix} value: "${tok}"` };
    }
    const n = parseInt(tok, BASE[radix]);
    if (Number.isNaN(n) || n < 0 || n > 255) {
      return { ok: false, value: "", error: `Byte out of range: "${tok}"` };
    }
    bytes.push(n);
  }
  const value = new TextDecoder("utf-8").decode(new Uint8Array(bytes));
  return { ok: true, value };
}
