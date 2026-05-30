export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordResult {
  ok: boolean;
  password: string;
  /** Estimated entropy in bits. */
  entropy: number;
}

const SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/|~",
} as const;

/** Characters that are easy to confuse with one another. */
const AMBIGUOUS = new Set("Il1Lo0OB8S5Z2G6q9|");

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Uniformly distributed integer in [0, max) without modulo bias. */
function secureRandomInt(max: number): number {
  if (max <= 0) return 0;
  const c = getCrypto();
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    c.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

/** Build the character pool from the selected options. */
export function buildPool(opts: PasswordOptions): string {
  let pool = "";
  if (opts.lowercase) pool += SETS.lowercase;
  if (opts.uppercase) pool += SETS.uppercase;
  if (opts.numbers) pool += SETS.numbers;
  if (opts.symbols) pool += SETS.symbols;
  if (opts.excludeAmbiguous) {
    pool = Array.from(pool)
      .filter((ch) => !AMBIGUOUS.has(ch))
      .join("");
  }
  return pool;
}

/**
 * Generate a single password. Returns ok:false (empty password) when no
 * character set is selected so the UI can show a hint instead of crashing.
 */
export function generatePassword(opts: PasswordOptions): PasswordResult {
  const pool = buildPool(opts);
  const length = Math.max(1, Math.min(Math.floor(opts.length) || 0, 256));
  if (!pool) return { ok: false, password: "", entropy: 0 };

  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    chars.push(pool[secureRandomInt(pool.length)]);
  }
  const entropy = length * Math.log2(pool.length);
  return { ok: true, password: chars.join(""), entropy: Math.round(entropy) };
}

export interface Strength {
  label: string;
  /** 0-4, for rendering a meter. */
  level: 0 | 1 | 2 | 3 | 4;
}

/** Map entropy (bits) onto a coarse strength label. */
export function strengthFromEntropy(entropy: number): Strength {
  if (entropy <= 0) return { label: "—", level: 0 };
  if (entropy < 40) return { label: "Weak", level: 1 };
  if (entropy < 64) return { label: "Fair", level: 2 };
  if (entropy < 100) return { label: "Strong", level: 3 };
  return { label: "Very strong", level: 4 };
}
