const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** Decode an RFC 4648 Base32 secret into raw bytes. */
function decodeBase32ToBytes(input: string): Uint8Array<ArrayBuffer> | null {
  const clean = input.toUpperCase().replace(/=+$/g, "").replace(/\s+/g, "");
  if (!clean) return new Uint8Array(0);
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = BASE32_ALPHABET.indexOf(ch);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

export interface TotpResult {
  ok: boolean;
  code: string;
  secondsRemaining: number;
  error?: string;
}

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

export interface TotpOptions {
  digits?: number;
  period?: number;
  /** Seconds since the Unix epoch. Defaults to now. */
  timestamp?: number;
}

/** Generate the current TOTP code (RFC 6238, HMAC-SHA1) from a Base32 secret. */
export async function generateTotp(
  secret: string,
  opts: TotpOptions = {}
): Promise<TotpResult> {
  const digits = opts.digits ?? 6;
  const period = opts.period ?? 30;
  const now = opts.timestamp ?? Math.floor(Date.now() / 1000);

  if (!secret.trim()) return { ok: true, code: "", secondsRemaining: 0 };

  const key = decodeBase32ToBytes(secret);
  if (!key || key.length === 0) {
    return { ok: false, code: "", secondsRemaining: 0, error: "Invalid Base32 secret" };
  }

  const counter = Math.floor(now / period);
  // 8-byte big-endian counter.
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(0, Math.floor(counter / 2 ** 32));
  view.setUint32(4, counter >>> 0);

  try {
    const cryptoKey = await getCrypto().subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );
    const sig = new Uint8Array(await getCrypto().subtle.sign("HMAC", cryptoKey, buf));

    // Dynamic truncation (RFC 4226).
    const offset = sig[sig.length - 1] & 0x0f;
    const binary =
      ((sig[offset] & 0x7f) << 24) |
      ((sig[offset + 1] & 0xff) << 16) |
      ((sig[offset + 2] & 0xff) << 8) |
      (sig[offset + 3] & 0xff);

    const code = (binary % 10 ** digits).toString().padStart(digits, "0");
    const secondsRemaining = period - (now % period);
    return { ok: true, code, secondsRemaining };
  } catch (e) {
    return {
      ok: false,
      code: "",
      secondsRemaining: 0,
      error: e instanceof Error ? e.message : "Failed to generate code",
    };
  }
}
