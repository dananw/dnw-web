export interface TextGradientConfig {
  angle: number;
  colors: string[];
}

export const DEFAULT_TEXT_GRADIENT: TextGradientConfig = {
  angle: 90,
  colors: ["#ea7a18", "#c2410c"],
};

/** The linear-gradient value, e.g. "linear-gradient(90deg, #fff, #000)". */
export function buildTextGradient(cfg: TextGradientConfig): string {
  const stops = cfg.colors.join(", ");
  return `linear-gradient(${cfg.angle}deg, ${stops})`;
}

/** Full CSS block that clips the gradient to text. */
export function textGradientCss(cfg: TextGradientConfig): string {
  const gradient = buildTextGradient(cfg);
  return [
    `background: ${gradient};`,
    "-webkit-background-clip: text;",
    "background-clip: text;",
    "color: transparent;",
  ].join("\n");
}
