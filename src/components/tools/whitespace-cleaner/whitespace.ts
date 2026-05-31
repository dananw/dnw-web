export interface CleanOptions {
  trimLines: boolean;
  collapseSpaces: boolean;
  removeBlankLines: boolean;
  removeAllLineBreaks: boolean;
  tabsToSpaces: boolean;
  tabWidth: number;
}

export const DEFAULT_CLEAN: CleanOptions = {
  trimLines: true,
  collapseSpaces: true,
  removeBlankLines: false,
  removeAllLineBreaks: false,
  tabsToSpaces: false,
  tabWidth: 2,
};

/** Apply the selected whitespace transformations in a sensible order. */
export function cleanWhitespace(text: string, opts: CleanOptions): string {
  if (!text) return "";
  let result = text;

  if (opts.tabsToSpaces) {
    const spaces = " ".repeat(Math.max(1, Math.min(opts.tabWidth || 2, 8)));
    result = result.replace(/\t/g, spaces);
  }

  // Work line by line for trim / collapse / blank-line handling.
  let lines = result.split(/\r\n|\r|\n/);
  if (opts.collapseSpaces) {
    lines = lines.map((l) => l.replace(/ {2,}/g, " "));
  }
  if (opts.trimLines) {
    lines = lines.map((l) => l.trim());
  }
  if (opts.removeBlankLines) {
    lines = lines.filter((l) => l.trim() !== "");
  }
  result = lines.join("\n");

  if (opts.removeAllLineBreaks) {
    result = result.replace(/\n+/g, " ").replace(/ {2,}/g, " ").trim();
  }

  return result;
}
