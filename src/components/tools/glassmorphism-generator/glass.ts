export interface GlassConfig {
  blur: number;
  transparency: number; // 0-1 alpha of the fill
  color: string; // hex
  borderRadius: number;
  showBorder: boolean;
}

export const DEFAULT_GLASS: GlassConfig = {
  blur: 8,
  transparency: 0.25,
  color: "#ffffff",
  borderRadius: 16,
  showBorder: true,
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) h = "ffffff";
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function fill(cfg: GlassConfig): string {
  const { r, g, b } = hexToRgb(cfg.color);
  const a = Math.min(1, Math.max(0, cfg.transparency));
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
}

/** Inline style for the live preview. */
export function glassStyle(cfg: GlassConfig): Record<string, string> {
  const style: Record<string, string> = {
    background: fill(cfg),
    backdropFilter: `blur(${cfg.blur}px)`,
    WebkitBackdropFilter: `blur(${cfg.blur}px)`,
    borderRadius: `${cfg.borderRadius}px`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  };
  if (cfg.showBorder) style.border = "1px solid rgba(255, 255, 255, 0.3)";
  return style;
}

/** CSS declaration block, ready to paste. */
export function glassCss(cfg: GlassConfig): string {
  const lines = [
    `background: ${fill(cfg)};`,
    `backdrop-filter: blur(${cfg.blur}px);`,
    `-webkit-backdrop-filter: blur(${cfg.blur}px);`,
    `border-radius: ${cfg.borderRadius}px;`,
    "box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);",
  ];
  if (cfg.showBorder) lines.push("border: 1px solid rgba(255, 255, 255, 0.3);");
  return lines.join("\n");
}
