const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export interface ConvertResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Encode UTF-8 text to RFC 4648 Base32. */
export function encodeBase32(text: string): ConvertResult {
  if (!text) return { ok: true, value: "" };
  const bytes = new TextEncoder().encode(text);
  let bits = 0;
  let value = 0;
  let out = "";
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  while (out.length % 8 !== 0) out += "=";
  return { ok: true, value: out };
}

/** Decode RFC 4648 Base32 into the raw bytes (shared by Base32 + TOTP). */
export function decodeBase32ToBytes(input: string): Uint8Array | null {
  const clean = input.toUpperCase().replace(/=+$/g, "").replace(/\s+/g, "");
  if (!clean) return new Uint8Array(0);
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = ALPHABET.indexOf(ch);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

/** Decode Base32 into UTF-8 text. */
export function decodeBase32(input: string): ConvertResult {
  if (!input.trim()) return { ok: true, value: "" };
  const bytes = decodeBase32ToBytes(input);
  if (!bytes) return { ok: false, value: "", error: "Invalid Base32 input" };
  return { ok: true, value: new TextDecoder().decode(bytes) };
}
