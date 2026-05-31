export type ReverseMode = "characters" | "words" | "lines";

/** Reverse text by characters, words or lines. */
export function reverseText(text: string, mode: ReverseMode): string {
  if (!text) return "";
  if (mode === "characters") {
    // Array.from respects surrogate pairs (emoji, etc.).
    return Array.from(text).reverse().join("");
  }
  if (mode === "words") {
    return text
      .split(/(\s+)/) // keep separators so spacing is preserved
      .reverse()
      .join("");
  }
  return text.split(/\r?\n/).reverse().join("\n");
}
