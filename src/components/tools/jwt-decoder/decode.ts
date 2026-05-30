export interface JwtParts {
  header: string;
  payload: string;
  signature: string;
  /** Decoded exp/iat rendered as human dates, when present. */
  expiresAt?: string;
  issuedAt?: string;
  expired?: boolean;
}

export interface DecodeSuccess {
  ok: true;
  data: JwtParts;
}

export interface DecodeError {
  ok: false;
  message: string;
}

export type DecodeResult = DecodeSuccess | DecodeError;

/** Decode a base64url segment to a UTF-8 string. */
function base64UrlDecode(segment: string): string {
  let b64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  // Pad to a multiple of 4.
  while (b64.length % 4) b64 += "=";
  if (typeof atob === "undefined") {
    // SSR / Node fallback.
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  const binary = atob(b64);
  // Handle UTF-8 multibyte sequences.
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function prettyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

function readClaimSeconds(raw: string, claim: string): number | undefined {
  try {
    const obj = JSON.parse(raw);
    const v = obj?.[claim];
    return typeof v === "number" ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Decode (NOT verify) a JWT into its header and payload. */
export function decodeJwt(token: string): DecodeResult {
  const trimmed = token.trim();
  if (!trimmed) return { ok: false, message: "Paste a token to decode." };

  const segments = trimmed.split(".");
  if (segments.length !== 3) {
    return {
      ok: false,
      message:
        "A JWT must have three dot-separated segments (header.payload.signature).",
    };
  }

  try {
    const headerRaw = base64UrlDecode(segments[0]);
    const payloadRaw = base64UrlDecode(segments[1]);

    const exp = readClaimSeconds(payloadRaw, "exp");
    const iat = readClaimSeconds(payloadRaw, "iat");

    return {
      ok: true,
      data: {
        header: prettyJson(headerRaw),
        payload: prettyJson(payloadRaw),
        signature: segments[2],
        expiresAt: exp ? new Date(exp * 1000).toLocaleString() : undefined,
        issuedAt: iat ? new Date(iat * 1000).toLocaleString() : undefined,
        expired: exp ? exp * 1000 < Date.now() : undefined,
      },
    };
  } catch {
    return {
      ok: false,
      message: "Could not decode token segments. Is this a valid JWT?",
    };
  }
}
