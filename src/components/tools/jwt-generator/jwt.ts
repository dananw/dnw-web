export interface JwtResult {
  ok: boolean;
  token: string;
  error?: string;
}

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

function bytesToB64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function strToB64Url(s: string): string {
  return bytesToB64Url(new TextEncoder().encode(s));
}

/** Build and sign a JWT using HS256. */
export async function signJwt(payloadText: string, secret: string): Promise<JwtResult> {
  if (!payloadText.trim()) return { ok: true, token: "" };

  let payload: unknown;
  try {
    payload = JSON.parse(payloadText);
  } catch (e) {
    return { ok: false, token: "", error: e instanceof Error ? e.message : "Invalid JSON payload" };
  }
  if (!secret) return { ok: false, token: "", error: "A secret is required to sign" };

  try {
    const header = { alg: "HS256", typ: "JWT" };
    const headerB64 = strToB64Url(JSON.stringify(header));
    const payloadB64 = strToB64Url(JSON.stringify(payload));
    const signingInput = `${headerB64}.${payloadB64}`;

    const key = await getCrypto().subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await getCrypto().subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(signingInput)
    );
    const sigB64 = bytesToB64Url(new Uint8Array(sig));
    return { ok: true, token: `${signingInput}.${sigB64}` };
  } catch (e) {
    return { ok: false, token: "", error: e instanceof Error ? e.message : "Failed to sign token" };
  }
}
