function toBinary(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return binary;
}

/** Encode a UTF-8 string to Base64. */
export function encodeBase64(input: string, urlSafe = false): string {
  if (!input) return "";
  const bytes = new TextEncoder().encode(input);
  const base =
    typeof btoa !== "undefined"
      ? btoa(toBinary(bytes))
      : Buffer.from(bytes).toString("base64");
  if (!urlSafe) return base;
  return base.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export interface DecodeResult {
  ok: boolean;
  value: string;
}

/** Decode Base64 (standard or URL-safe) to a UTF-8 string. */
export function decodeBase64(input: string): DecodeResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  try {
    let b64 = trimmed.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const binary =
      typeof atob !== "undefined"
        ? atob(b64)
        : Buffer.from(b64, "base64").toString("binary");
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return {
      ok: true,
      value: new TextDecoder("utf-8", { fatal: false }).decode(bytes),
    };
  } catch {
    return { ok: false, value: "" };
  }
}
