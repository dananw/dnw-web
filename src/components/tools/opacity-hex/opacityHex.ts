function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Opacity percentage (0-100) to a 2-digit hex alpha value. */
export function percentToHexAlpha(percent: number): string {
  const a = Math.round((clamp(percent, 0, 100) / 100) * 255);
  return a.toString(16).padStart(2, "0").toUpperCase();
}

/** 2-digit hex alpha back to a rounded opacity percentage. */
export function hexAlphaToPercent(hex: string): number | null {
  const h = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{2}$/.test(h)) return null;
  return Math.round((parseInt(h, 16) / 255) * 100);
}

/** Combine a #RRGGBB color with an opacity into an 8-digit hex (#RRGGBBAA). */
export function buildHex8(hex6: string, percent: number): string | null {
  let h = hex6.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return `#${h.toUpperCase()}${percentToHexAlpha(percent)}`;
}
