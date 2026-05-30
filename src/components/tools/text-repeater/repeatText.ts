export type RepeatSeparator = "none" | "newline" | "space" | "comma";

const SEPARATORS: Record<RepeatSeparator, string> = {
  none: "",
  newline: "\n",
  space: " ",
  comma: ", ",
};

/** Repeat `text` `count` times, joined by the chosen separator. */
export function repeatText(text: string, count: number, separator: RepeatSeparator): string {
  if (!text) return "";
  const n = Math.max(0, Math.min(Math.floor(count) || 0, 10000));
  if (n === 0) return "";
  return Array.from({ length: n }, () => text).join(SEPARATORS[separator]);
}
