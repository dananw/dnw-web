export type TriangleDirection = "up" | "down" | "left" | "right";

export interface TriangleConfig {
  direction: TriangleDirection;
  size: number;
  color: string;
}

export const DEFAULT_TRIANGLE: TriangleConfig = {
  direction: "up",
  size: 60,
  color: "#ea7a18",
};

export const DIRECTIONS: TriangleDirection[] = ["up", "down", "left", "right"];

/** Inline style props (for the live preview) using the border trick. */
export function triangleStyle(cfg: TriangleConfig): Record<string, string> {
  const s = `${cfg.size}px`;
  const transparent = `${s} solid transparent`;
  const solid = `${s} solid ${cfg.color}`;
  const base: Record<string, string> = { width: "0", height: "0" };
  switch (cfg.direction) {
    case "up":
      return { ...base, borderLeft: transparent, borderRight: transparent, borderBottom: solid };
    case "down":
      return { ...base, borderLeft: transparent, borderRight: transparent, borderTop: solid };
    case "left":
      return { ...base, borderTop: transparent, borderBottom: transparent, borderRight: solid };
    case "right":
      return { ...base, borderTop: transparent, borderBottom: transparent, borderLeft: solid };
  }
}

/** The CSS declaration block, ready to paste. */
export function triangleCss(cfg: TriangleConfig): string {
  const style = triangleStyle(cfg);
  const order = [
    "width",
    "height",
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
  ];
  const toKebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  const lines = order
    .filter((k) => k in style)
    .map((k) => `  ${toKebab(k)}: ${style[k]};`);
  return `.triangle {\n${lines.join("\n")}\n}`;
}
