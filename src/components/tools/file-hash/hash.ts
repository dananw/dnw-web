export type HashAlgo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export const HASH_ALGOS: HashAlgo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Hash an ArrayBuffer and return a lowercase hex digest. */
export async function hashBuffer(buffer: ArrayBuffer, algo: HashAlgo): Promise<string> {
  const digest = await getCrypto().subtle.digest(algo, buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Human-readable byte size, e.g. "1.5 KB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${Number(value.toFixed(2))} ${units[i]}`;
}
