export interface MinifyResult {
  value: string;
  originalSize: number;
  minifiedSize: number;
  savedPercent: number;
}

/**
 * Conservatively minify CSS: strip comments and collapse whitespace, then trim
 * spaces around safe delimiters. Spaces around +, -, >, ~ are left intact so
 * calc() expressions and combinators keep working.
 */
export function minifyCss(css: string): MinifyResult {
  const originalSize = css.length;
  let out = css.replace(/\/\*[\s\S]*?\*\//g, ""); // comments
  out = out.replace(/\s+/g, " "); // collapse whitespace
  out = out.replace(/\s*([{};,])\s*/g, "$1"); // tidy around safe delimiters
  out = out.replace(/\s*:\s*/g, ":"); // tidy around colons (safe: no colons in calc)
  out = out.replace(/;}/g, "}"); // drop the last semicolon in a block
  out = out.trim();

  const minifiedSize = out.length;
  const savedPercent =
    originalSize > 0
      ? Math.round(((originalSize - minifiedSize) / originalSize) * 100)
      : 0;
  return { value: out, originalSize, minifiedSize, savedPercent };
}
