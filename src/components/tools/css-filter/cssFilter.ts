export interface FilterConfig {
  blur: number; // px
  brightness: number; // %
  contrast: number; // %
  grayscale: number; // %
  saturate: number; // %
  sepia: number; // %
  hueRotate: number; // deg
  invert: number; // %
}

export const DEFAULT_FILTER: FilterConfig = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  saturate: 100,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
};

interface FilterDef {
  key: keyof FilterConfig;
  label: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  fn: string;
}

export const FILTERS: FilterDef[] = [
  { key: "blur", label: "Blur", min: 0, max: 20, default: 0, unit: "px", fn: "blur" },
  { key: "brightness", label: "Brightness", min: 0, max: 200, default: 100, unit: "%", fn: "brightness" },
  { key: "contrast", label: "Contrast", min: 0, max: 200, default: 100, unit: "%", fn: "contrast" },
  { key: "grayscale", label: "Grayscale", min: 0, max: 100, default: 0, unit: "%", fn: "grayscale" },
  { key: "saturate", label: "Saturate", min: 0, max: 300, default: 100, unit: "%", fn: "saturate" },
  { key: "sepia", label: "Sepia", min: 0, max: 100, default: 0, unit: "%", fn: "sepia" },
  { key: "hueRotate", label: "Hue rotate", min: 0, max: 360, default: 0, unit: "deg", fn: "hue-rotate" },
  { key: "invert", label: "Invert", min: 0, max: 100, default: 0, unit: "%", fn: "invert" },
];

/** Build the filter value, omitting anything left at its default. */
export function buildFilter(cfg: FilterConfig): string {
  const parts = FILTERS.filter((f) => cfg[f.key] !== f.default).map(
    (f) => `${f.fn}(${cfg[f.key]}${f.unit})`
  );
  return parts.length ? parts.join(" ") : "none";
}

export function filterCss(cfg: FilterConfig): string {
  return `filter: ${buildFilter(cfg)};`;
}
