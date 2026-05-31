export interface ConvertResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Decode Base64 into a lowercase hex string. */
export function base64ToHex(input: string): ConvertResult {
  const clean = input.trim().replace(/\s+/g, "");
  if (!clean) return { ok: true, value: "" };
  try {
    const binary = atob(clean);
    let hex = "";
    for (let i = 0; i < binary.length; i++) {
      hex += binary.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return { ok: true, value: hex };
  } catch {
    return { ok: false, value: "", error: "Invalid Base64 input" };
  }
}

/** Encode a hex string into Base64. */
export function hexToBase64(input: string): ConvertResult {
  const clean = input.trim().replace(/^0x/i, "").replace(/\s+/g, "");
  if (!clean) return { ok: true, value: "" };
  if (!/^[0-9a-fA-F]*$/.test(clean)) {
    return { ok: false, value: "", error: "Hex may only contain 0-9 and a-f" };
  }
  if (clean.length % 2 !== 0) {
    return { ok: false, value: "", error: "Hex must have an even number of digits" };
  }
  let binary = "";
  for (let i = 0; i < clean.length; i += 2) {
    binary += String.fromCharCode(parseInt(clean.slice(i, i + 2), 16));
  }
  return { ok: true, value: btoa(binary) };
}
