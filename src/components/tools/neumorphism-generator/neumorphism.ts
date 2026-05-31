export type NeuShape = "flat" | "concave" | "convex";

export interface NeuConfig {
  color: string;
  size: number;
  radius: number;
  distance: number;
  blur: number;
  intensity: number; // 0-1
  shape: NeuShape;
}

export const DEFAULT_NEU: NeuConfig = {
  color: "#e0e0e0",
  size: 180,
  radius: 32,
  distance: 12,
  blur: 24,
  intensity: 0.15,
  shape: "flat",
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) h = "e0e0e0";
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function toHex({ r, g, b }: { r: number; g: number; b: number }): string {
  const c = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Shift a color toward white (amount>0) or black (amount<0). */
function adjust(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const shift = (c: number) => (amount >= 0 ? c + (255 - c) * amount : c * (1 + amount));
  return toHex({ r: shift(r), g: shift(g), b: shift(b) });
}

export function lightColor(cfg: NeuConfig): string {
  return adjust(cfg.color, cfg.intensity);
}
export function darkColor(cfg: NeuConfig): string {
  return adjust(cfg.color, -cfg.intensity);
}

function background(cfg: NeuConfig): string {
  if (cfg.shape === "flat") return cfg.color;
  const a = lightColor(cfg);
  const b = darkColor(cfg);
  const [c1, c2] = cfg.shape === "concave" ? [b, a] : [a, b];
  return `linear-gradient(145deg, ${c1}, ${c2})`;
}

/** Inline style for the live preview. */
export function neuStyle(cfg: NeuConfig): Record<string, string> {
  const d = cfg.distance;
  return {
    background: background(cfg),
    borderRadius: `${cfg.radius}px`,
    boxShadow: `${d}px ${d}px ${cfg.blur}px ${darkColor(cfg)}, -${d}px -${d}px ${cfg.blur}px ${lightColor(cfg)}`,
  };
}

/** CSS declaration block, ready to paste. */
export function neuCss(cfg: NeuConfig): string {
  const d = cfg.distance;
  return [
    `border-radius: ${cfg.radius}px;`,
    `background: ${background(cfg)};`,
    `box-shadow: ${d}px ${d}px ${cfg.blur}px ${darkColor(cfg)},`,
    `            -${d}px -${d}px ${cfg.blur}px ${lightColor(cfg)};`,
  ].join("\n");
}
