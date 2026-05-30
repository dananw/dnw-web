export type HmacAlgo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export const HMAC_ALGOS: HmacAlgo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export interface HmacResult {
  ok: boolean;
  hex: string;
  error?: string;
}

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Compute an HMAC signature and return it as a lowercase hex string. */
export async function hmac(
  message: string,
  key: string,
  algo: HmacAlgo
): Promise<HmacResult> {
  if (!key) return { ok: true, hex: "" };
  try {
    const enc = new TextEncoder();
    const cryptoKey = await getCrypto().subtle.importKey(
      "raw",
      enc.encode(key),
      { name: "HMAC", hash: algo },
      false,
      ["sign"]
    );
    const sig = await getCrypto().subtle.sign(
      "HMAC",
      cryptoKey,
      enc.encode(message)
    );
    const hex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return { ok: true, hex };
  } catch (e) {
    return {
      ok: false,
      hex: "",
      error: e instanceof Error ? e.message : "Failed to compute HMAC",
    };
  }
}
