export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function parseHex(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const to = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** Mix a color toward a target (white or black) by amount 0-1. */
function mix(base: RGB, target: RGB, amount: number): RGB {
  return {
    r: base.r + (target.r - base.r) * amount,
    g: base.g + (target.g - base.g) * amount,
    b: base.b + (target.b - base.b) * amount,
  };
}

export interface Swatch {
  /** Label like "100", "500" (base), "900". */
  label: string;
  hex: string;
  isBase: boolean;
}

const WHITE: RGB = { r: 255, g: 255, b: 255 };
const BLACK: RGB = { r: 0, g: 0, b: 0 };

/**
 * Produce a 10-step tint/shade scale (50..900-ish) from a base color, with the
 * base sitting in the middle at "500".
 */
export function generateShades(hex: string): Swatch[] {
  const base = parseHex(hex);
  if (!base) return [];
  const steps: { label: string; amount: number; toward: RGB }[] = [
    { label: "50", amount: 0.9, toward: WHITE },
    { label: "100", amount: 0.75, toward: WHITE },
    { label: "200", amount: 0.55, toward: WHITE },
    { label: "300", amount: 0.35, toward: WHITE },
    { label: "400", amount: 0.15, toward: WHITE },
    { label: "500", amount: 0, toward: WHITE },
    { label: "600", amount: 0.15, toward: BLACK },
    { label: "700", amount: 0.3, toward: BLACK },
    { label: "800", amount: 0.45, toward: BLACK },
    { label: "900", amount: 0.6, toward: BLACK },
  ];
  return steps.map((s) => ({
    label: s.label,
    hex: rgbToHex(s.amount === 0 ? base : mix(base, s.toward, s.amount)),
    isBase: s.label === "500",
  }));
}
