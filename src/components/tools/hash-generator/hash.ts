export const HASH_ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
export type HashAlgo = (typeof HASH_ALGOS)[number];

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Compute a hex digest of `input` using the Web Crypto API.
 * Returns "" for empty input. Requires a secure context (crypto.subtle).
 */
export async function hashText(input: string, algo: HashAlgo): Promise<string> {
  if (!input) return "";
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algo, data);
  return toHex(digest);
}

export async function hashAll(
  input: string,
): Promise<Record<HashAlgo, string>> {
  const entries = await Promise.all(
    HASH_ALGOS.map(
      async (algo) => [algo, await hashText(input, algo)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<HashAlgo, string>;
}
