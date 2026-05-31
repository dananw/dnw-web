export interface RadiusConfig {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export const DEFAULT_RADIUS: RadiusConfig = {
  topLeft: 12,
  topRight: 12,
  bottomRight: 12,
  bottomLeft: 12,
};

export const CORNERS: { key: keyof RadiusConfig; label: string }[] = [
  { key: "topLeft", label: "Top left" },
  { key: "topRight", label: "Top right" },
  { key: "bottomRight", label: "Bottom right" },
  { key: "bottomLeft", label: "Bottom left" },
];

/** The shorthand border-radius value (collapses to one value when uniform). */
export function buildRadius(cfg: RadiusConfig): string {
  const { topLeft, topRight, bottomRight, bottomLeft } = cfg;
  if (
    topLeft === topRight &&
    topRight === bottomRight &&
    bottomRight === bottomLeft
  ) {
    return `${topLeft}px`;
  }
  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}

/** Full CSS declaration ready to paste. */
export function borderRadiusCss(cfg: RadiusConfig): string {
  return `border-radius: ${buildRadius(cfg)};`;
}
