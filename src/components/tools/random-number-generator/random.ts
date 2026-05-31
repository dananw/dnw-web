function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Uniformly distributed integer in [0, maxExclusive) without modulo bias. */
function secureRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;
  const c = getCrypto();
  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    c.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % maxExclusive;
}

export interface RandomResult {
  ok: boolean;
  numbers: number[];
  error?: string;
}

/** Generate `count` random integers in [min, max], optionally all unique. */
export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  unique: boolean
): RandomResult {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    return { ok: false, numbers: [], error: "Enter valid min and max values" };
  }
  if (hi < lo) {
    return { ok: false, numbers: [], error: "Max must be greater than or equal to min" };
  }

  const n = Math.max(1, Math.min(Math.floor(count) || 1, 1000));
  const rangeSize = hi - lo + 1;

  if (unique) {
    if (n > rangeSize) {
      return {
        ok: false,
        numbers: [],
        error: `Only ${rangeSize} unique value(s) available in that range`,
      };
    }
    const pool = new Set<number>();
    while (pool.size < n) pool.add(lo + secureRandomInt(rangeSize));
    return { ok: true, numbers: [...pool] };
  }

  const numbers: number[] = [];
  for (let i = 0; i < n; i++) numbers.push(lo + secureRandomInt(rangeSize));
  return { ok: true, numbers };
}
