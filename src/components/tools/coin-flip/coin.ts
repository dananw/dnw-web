function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) return globalThis.crypto;
  throw new Error("Web Crypto API is not available");
}

export type Side = "H" | "T";

export interface CoinResult {
  results: Side[];
  heads: number;
  tails: number;
}

/** Flip `count` fair coins using the Web Crypto API. */
export function flipCoins(count: number): CoinResult {
  const n = Math.max(1, Math.min(Math.floor(count) || 1, 10000));
  const bytes = new Uint8Array(n);
  getCrypto().getRandomValues(bytes);

  const results: Side[] = [];
  let heads = 0;
  for (let i = 0; i < n; i++) {
    const side: Side = bytes[i] % 2 === 0 ? "H" : "T";
    results.push(side);
    if (side === "H") heads++;
  }
  return { results, heads, tails: n - heads };
}
