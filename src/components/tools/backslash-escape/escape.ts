/** Escape text for use inside a source-code string literal. */
export function escapeString(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
    .replace(/\v/g, "\\v")
    .replace(/"/g, '\\"');
}

const SIMPLE: Record<string, string> = {
  n: "\n",
  r: "\r",
  t: "\t",
  f: "\f",
  v: "\v",
  b: "\b",
  "0": "\0",
  "\\": "\\",
  '"': '"',
  "'": "'",
  "/": "/",
};

/** Unescape a string literal: handles \n, \t, \uXXXX, \xXX and friends. */
export function unescapeString(text: string): string {
  return text.replace(
    /\\(u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|.)/g,
    (_, group: string) => {
      if (group[0] === "u" || group[0] === "x") {
        return String.fromCharCode(parseInt(group.slice(1), 16));
      }
      return SIMPLE[group] ?? group;
    }
  );
}
