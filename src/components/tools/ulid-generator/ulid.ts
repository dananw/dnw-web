// Crockford's Base32 alphabet (excludes I, L, O and U to avoid ambiguity).
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const TIME_LEN = 10;
const RANDOM_LEN = 16;

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Encode a 48-bit millisecond timestamp into 10 Crockford base32 chars. */
function encodeTime(now: number): string {
  let time = Math.floor(now);
  let out = "";
  for (let i = TIME_LEN - 1; i >= 0; i--) {
    const mod = time % 32;
    out = ENCODING[mod] + out;
    time = (time - mod) / 32;
  }
  return out;
}

/** Encode 80 bits of randomness into 16 Crockford base32 chars. */
function encodeRandom(): string {
  const c = getCrypto();
  const bytes = new Uint8Array(RANDOM_LEN);
  c.getRandomValues(bytes);
  let out = "";
  // 256 is divisible by 32, so byte % 32 stays uniform across 0-31.
  for (let i = 0; i < RANDOM_LEN; i++) {
    out += ENCODING[bytes[i] % 32];
  }
  return out;
}

/** Generate a single 26-char ULID for the given time (defaults to now). */
export function ulid(now: number = Date.now()): string {
  return encodeTime(now) + encodeRandom();
}

/** Generate `count` ULIDs (clamped to 1..1000). */
export function generateUlids(count: number): string[] {
  const n = Math.max(1, Math.min(Math.floor(count) || 1, 1000));
  const now = Date.now();
  return Array.from({ length: n }, () => ulid(now));
}

/** Extract the embedded millisecond timestamp from a ULID. */
export function decodeTime(id: string): number | null {
  if (id.length < TIME_LEN) return null;
  const timePart = id.slice(0, TIME_LEN).toUpperCase();
  let time = 0;
  for (const char of timePart) {
    const idx = ENCODING.indexOf(char);
    if (idx === -1) return null;
    time = time * 32 + idx;
  }
  return time;
}
