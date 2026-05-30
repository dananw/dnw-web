interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

function parseHex(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }: HSL): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

const rotate = (hsl: HSL, deg: number): HSL => ({
  ...hsl,
  h: (hsl.h + deg + 360) % 360,
});

export interface Harmony {
  name: string;
  colors: string[];
}

/** Generate classic color harmonies from a base HEX color. */
export function generateHarmonies(hex: string): Harmony[] | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const base = rgbToHsl(rgb);
  const at = (deg: number) => hslToHex(rotate(base, deg));
  return [
    { name: "Complementary", colors: [hex, at(180)] },
    { name: "Analogous", colors: [at(-30), hex, at(30)] },
    { name: "Triadic", colors: [hex, at(120), at(240)] },
    { name: "Split complementary", colors: [hex, at(150), at(210)] },
    { name: "Tetradic", colors: [hex, at(90), at(180), at(270)] },
  ];
}
