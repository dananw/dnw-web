export interface BezierConfig {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const DEFAULT_BEZIER: BezierConfig = { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 };

export const BEZIER_PRESETS: { label: string; cfg: BezierConfig }[] = [
  { label: "ease", cfg: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 } },
  { label: "linear", cfg: { x1: 0, y1: 0, x2: 1, y2: 1 } },
  { label: "ease-in", cfg: { x1: 0.42, y1: 0, x2: 1, y2: 1 } },
  { label: "ease-out", cfg: { x1: 0, y1: 0, x2: 0.58, y2: 1 } },
  { label: "ease-in-out", cfg: { x1: 0.42, y1: 0, x2: 0.58, y2: 1 } },
];

const round = (n: number) => Math.round(n * 100) / 100;

/** The CSS timing-function value, e.g. "cubic-bezier(0.25, 0.1, 0.25, 1)". */
export function bezierCss(cfg: BezierConfig): string {
  return `cubic-bezier(${round(cfg.x1)}, ${round(cfg.y1)}, ${round(cfg.x2)}, ${round(cfg.y2)})`;
}

/**
 * Build an SVG path for the curve in a `size` x `size` box. The Y axis is
 * flipped so the curve reads bottom-left (0,0) to top-right (1,1).
 */
export function bezierPath(cfg: BezierConfig, size = 100): string {
  const x = (v: number) => v * size;
  const y = (v: number) => size - v * size;
  return `M ${x(0)} ${y(0)} C ${x(cfg.x1)} ${y(cfg.y1)}, ${x(cfg.x2)} ${y(cfg.y2)}, ${x(1)} ${y(1)}`;
}
