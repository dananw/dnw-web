export interface CaseDef {
  key: string;
  label: string;
  convert: (words: string[]) => string;
}

/**
 * Split arbitrary input into lowercase words, handling camelCase, snake_case,
 * kebab-case, spaces, and acronyms (e.g. "parseHTMLToDOM").
 */
export function toWords(input: string): string[] {
  if (!input.trim()) return [];
  return (
    input
      // insert space between camelCase boundaries
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      // split acronym followed by word: "HTMLParser" -> "HTML Parser"
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      // non-alphanumeric to spaces
      .replace(/[_\-./]+/g, " ")
      .trim()
      .split(/\s+/)
      .map((w) => w.toLowerCase())
      .filter(Boolean)
  );
}

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

export const caseDefs: CaseDef[] = [
  {
    key: "camel",
    label: "camelCase",
    convert: (w) => w.map((x, i) => (i === 0 ? x : cap(x))).join(""),
  },
  { key: "pascal", label: "PascalCase", convert: (w) => w.map(cap).join("") },
  { key: "snake", label: "snake_case", convert: (w) => w.join("_") },
  {
    key: "constant",
    label: "CONSTANT_CASE",
    convert: (w) => w.join("_").toUpperCase(),
  },
  { key: "kebab", label: "kebab-case", convert: (w) => w.join("-") },
  { key: "train", label: "Train-Case", convert: (w) => w.map(cap).join("-") },
  { key: "dot", label: "dot.case", convert: (w) => w.join(".") },
  { key: "title", label: "Title Case", convert: (w) => w.map(cap).join(" ") },
  {
    key: "sentence",
    label: "Sentence case",
    convert: (w) => (w.length ? cap(w.join(" ")) : ""),
  },
  { key: "lower", label: "lower case", convert: (w) => w.join(" ") },
  {
    key: "upper",
    label: "UPPER CASE",
    convert: (w) => w.join(" ").toUpperCase(),
  },
];

export function convertAll(
  input: string,
): { key: string; label: string; value: string }[] {
  const words = toWords(input);
  return caseDefs.map((d) => ({
    key: d.key,
    label: d.label,
    value: d.convert(words),
  }));
}
