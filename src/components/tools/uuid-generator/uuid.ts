/** Generate a single RFC 4122 version 4 UUID using crypto when available. */
export function uuidV4(): string {
  const c: Crypto | undefined =
    typeof crypto !== "undefined" ? crypto : undefined;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  // Fallback using getRandomValues.
  const bytes = new Uint8Array(16);
  c!.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex
    .slice(6, 8)
    .join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

export function generateUuids(count: number): string[] {
  const n = Math.max(1, Math.min(count, 1000));
  return Array.from({ length: n }, () => uuidV4());
}
