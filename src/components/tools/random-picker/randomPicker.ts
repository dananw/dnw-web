function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) return globalThis.crypto;
  throw new Error("Web Crypto API is not available");
}

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

export interface PickResult {
  ok: boolean;
  picks: string[];
  error?: string;
}

/** Parse one item per line. */
export function parseItems(text: string): string[] {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

/** Pick `count` items at random, optionally without repeats. */
export function pickRandom(items: string[], count: number, unique: boolean): PickResult {
  if (items.length === 0) {
    return { ok: false, picks: [], error: "Add at least one item" };
  }
  const n = Math.max(1, Math.floor(count) || 1);
  if (unique && n > items.length) {
    return { ok: false, picks: [], error: `Only ${items.length} item(s) to pick from` };
  }

  if (unique) {
    // Fisher–Yates over a copy, take the first n.
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return { ok: true, picks: pool.slice(0, n) };
  }

  const picks: string[] = [];
  for (let i = 0; i < n; i++) picks.push(items[secureRandomInt(items.length)]);
  return { ok: true, picks };
}
