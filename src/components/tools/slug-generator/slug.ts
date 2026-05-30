export interface SlugOptions {
  separator: string;
  lowercase: boolean;
}

/**
 * Convert a title into a URL-friendly slug. Transliterates accented characters
 * via Unicode NFD normalization, strips remaining non-alphanumerics, and
 * collapses separators.
 */
export function slugify(input: string, options: SlugOptions): string {
  const { separator, lowercase } = options;
  if (!input.trim()) return "";

  let s = input
    .normalize("NFKD")
    // remove combining diacritical marks
    .replace(/[\u0300-\u036f]/g, "");

  if (lowercase) s = s.toLowerCase();

  s = s
    // replace anything that's not a letter/number with a space
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, separator);

  return s;
}
