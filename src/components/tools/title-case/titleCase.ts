// Minor words kept lowercase unless they're the first or last word.
const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "nor", "of",
  "on", "or", "per", "so", "the", "to", "up", "via", "vs", "yet",
]);

/** Convert text to title case, keeping minor words lowercase mid-title. */
export function toTitleCase(text: string): string {
  return text
    .split(/(\s+)/) // keep the whitespace tokens so spacing is preserved
    .map((token, index, arr) => {
      if (/^\s+$/.test(token) || token === "") return token;
      const lower = token.toLowerCase();
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;
      if (!isFirst && !isLast && SMALL_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
