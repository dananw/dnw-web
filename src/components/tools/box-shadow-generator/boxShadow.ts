export interface ShadowConfig {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  /** 0-100 alpha percentage applied to the color. */
  opacity: number;
  inset: boolean;
}

export const DEFAULT_SHADOW: ShadowConfig = {
  x: 0,
  y: 10,
  blur: 25,
  spread: -5,
  color: "#1a1a1a",
  opacity: 25,
  inset: false,
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Convert a #RGB/#RRGGBB hex plus 0-100 opacity into an rgba() string. */
export function hexToRgba(hex: string, opacity: number): string {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) h = "000000";
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = clamp(opacity, 0, 100) / 100;
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
}

/** The raw box-shadow value, e.g. "0px 10px 25px -5px rgba(...)". */
export function buildBoxShadow(cfg: ShadowConfig): string {
  const color = hexToRgba(cfg.color, cfg.opacity);
  const parts = [
    `${cfg.x}px`,
    `${cfg.y}px`,
    `${cfg.blur}px`,
    `${cfg.spread}px`,
    color,
  ];
  const value = parts.join(" ");
  return cfg.inset ? `inset ${value}` : value;
}

/** The full CSS declaration, ready to paste into a stylesheet. */
export function boxShadowCss(cfg: ShadowConfig): string {
  return `box-shadow: ${buildBoxShadow(cfg)};`;
}
