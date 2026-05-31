export type GradientType = "linear" | "radial";

export interface ColorStop {
  /** Stable id so React keys survive reordering/removal. */
  id: string;
  color: string;
  /** Position percentage 0-100. */
  position: number;
}

export interface GradientConfig {
  type: GradientType;
  /** Angle in degrees, used for linear gradients. */
  angle: number;
  stops: ColorStop[];
}

export const DEFAULT_GRADIENT: GradientConfig = {
  type: "linear",
  angle: 90,
  stops: [
    { id: "a", color: "#ea7a18", position: 0 },
    { id: "b", color: "#1a1a1a", position: 100 },
  ],
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Build the gradient value, e.g. "linear-gradient(90deg, #fff 0%, #000 100%)". */
export function buildGradient(cfg: GradientConfig): string {
  const stops = [...cfg.stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${clamp(s.position, 0, 100)}%`)
    .join(", ");
  if (cfg.type === "radial") {
    return `radial-gradient(circle, ${stops})`;
  }
  return `linear-gradient(${cfg.angle}deg, ${stops})`;
}

/** Full CSS declaration ready to paste. */
export function gradientCss(cfg: GradientConfig): string {
  return `background: ${buildGradient(cfg)};`;
}

let idCounter = 0;
/** Generate a unique id for a new color stop. */
export function newStopId(): string {
  idCounter += 1;
  return `stop-${idCounter}-${Math.random().toString(36).slice(2, 7)}`;
}
