export interface FlexConfig {
  direction: string;
  justify: string;
  align: string;
  wrap: string;
  gap: number;
}

export const DEFAULT_FLEX: FlexConfig = {
  direction: "row",
  justify: "flex-start",
  align: "stretch",
  wrap: "nowrap",
  gap: 8,
};

export const FLEX_OPTIONS = {
  direction: ["row", "row-reverse", "column", "column-reverse"],
  justify: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
  align: ["stretch", "flex-start", "flex-end", "center", "baseline"],
  wrap: ["nowrap", "wrap", "wrap-reverse"],
};

export function flexCss(cfg: FlexConfig): string {
  return [
    "display: flex;",
    `flex-direction: ${cfg.direction};`,
    `justify-content: ${cfg.justify};`,
    `align-items: ${cfg.align};`,
    `flex-wrap: ${cfg.wrap};`,
    `gap: ${cfg.gap}px;`,
  ].join("\n");
}
