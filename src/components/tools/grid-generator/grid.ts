export interface GridConfig {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
}

export const DEFAULT_GRID: GridConfig = {
  columns: 3,
  rows: 2,
  columnGap: 12,
  rowGap: 12,
};

export function gridCss(cfg: GridConfig): string {
  const cols = Math.max(1, Math.min(cfg.columns, 12));
  const rows = Math.max(1, Math.min(cfg.rows, 12));
  return [
    "display: grid;",
    `grid-template-columns: repeat(${cols}, 1fr);`,
    `grid-template-rows: repeat(${rows}, 1fr);`,
    `column-gap: ${cfg.columnGap}px;`,
    `row-gap: ${cfg.rowGap}px;`,
  ].join("\n");
}
