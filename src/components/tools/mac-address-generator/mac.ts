export type MacSeparator = ":" | "-" | ".";

export interface MacOptions {
  separator: MacSeparator;
  uppercase: boolean;
  /** Set the locally-administered + unicast bits in the first octet. */
  localUnicast: boolean;
}

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error("Web Crypto API is not available");
}

/** Generate one random MAC address formatted per the given options. */
export function generateMac(opts: MacOptions): string {
  const bytes = new Uint8Array(6);
  getCrypto().getRandomValues(bytes);

  if (opts.localUnicast) {
    // Set bit 1 (locally administered), clear bit 0 (unicast).
    bytes[0] = (bytes[0] | 0x02) & 0xfe;
  }

  let hexes = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0"));
  if (opts.uppercase) hexes = hexes.map((h) => h.toUpperCase());

  if (opts.separator === ".") {
    // Cisco style: three groups of four hex digits.
    const flat = hexes.join("");
    return `${flat.slice(0, 4)}.${flat.slice(4, 8)}.${flat.slice(8, 12)}`;
  }
  return hexes.join(opts.separator);
}

/** Generate `count` MAC addresses (clamped to 1..500). */
export function generateMacs(count: number, opts: MacOptions): string[] {
  const n = Math.max(1, Math.min(Math.floor(count) || 1, 500));
  return Array.from({ length: n }, () => generateMac(opts));
}
