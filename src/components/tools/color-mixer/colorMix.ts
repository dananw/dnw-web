export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function parseHex(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const c = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export interface MixResult {
  ok: boolean;
  hex: string;
  rgb: string;
}

/**
 * Mix two colors. `weight` is the proportion of the second color (0-1), so
 * 0 returns the first color and 1 returns the second.
 */
export function mixColors(a: string, b: string, weight: number): MixResult {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return { ok: false, hex: "", rgb: "" };
  const w = Math.min(1, Math.max(0, weight));
  const mixed: RGB = {
    r: ca.r + (cb.r - ca.r) * w,
    g: ca.g + (cb.g - ca.g) * w,
    b: ca.b + (cb.b - ca.b) * w,
  };
  const hex = rgbToHex(mixed);
  const c = parseHex(hex)!;
  return { ok: true, hex, rgb: `rgb(${c.r}, ${c.g}, ${c.b})` };
}
