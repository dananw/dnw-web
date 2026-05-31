export interface TextShadowConfig {
  x: number;
  y: number;
  blur: number;
  color: string;
  /** 0-100 alpha percentage applied to the color. */
  opacity: number;
}

export const DEFAULT_TEXT_SHADOW: TextShadowConfig = {
  x: 2,
  y: 2,
  blur: 4,
  color: "#1a1a1a",
  opacity: 35,
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

/** The raw text-shadow value, e.g. "2px 2px 4px rgba(...)". */
export function buildTextShadow(cfg: TextShadowConfig): string {
  return `${cfg.x}px ${cfg.y}px ${cfg.blur}px ${hexToRgba(cfg.color, cfg.opacity)}`;
}

/** Full CSS declaration ready to paste. */
export function textShadowCss(cfg: TextShadowConfig): string {
  return `text-shadow: ${buildTextShadow(cfg)};`;
}
