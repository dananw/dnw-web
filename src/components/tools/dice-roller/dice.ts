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

export interface DiceResult {
  ok: boolean;
  rolls: number[];
  modifier: number;
  total: number;
  error?: string;
}

/** Roll dice using standard notation, e.g. "2d6+3" or "d20". */
export function rollDice(notation: string): DiceResult {
  const m = notation.trim().match(/^(\d*)\s*d\s*(\d+)\s*([+-]\s*\d+)?$/i);
  if (!m) {
    return { ok: false, rolls: [], modifier: 0, total: 0, error: 'Use notation like "2d6+3"' };
  }
  const count = Math.min(Math.max(m[1] ? parseInt(m[1], 10) : 1, 1), 100);
  const sides = Math.min(Math.max(parseInt(m[2], 10), 1), 1000);
  const modifier = m[3] ? parseInt(m[3].replace(/\s/g, ""), 10) : 0;

  const rolls = Array.from({ length: count }, () => secureRandomInt(sides) + 1);
  const total = rolls.reduce((a, b) => a + b, 0) + modifier;
  return { ok: true, rolls, modifier, total };
}
