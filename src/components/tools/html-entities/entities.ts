const NAMED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Encode HTML-significant characters. When `all` is true, every non-ASCII
 * character is turned into a numeric entity too.
 */
export function encodeEntities(input: string, all = false): string {
  if (!input) return "";
  let out = input.replace(/[&<>"']/g, (c) => NAMED[c]);
  if (all) {
    out = out.replace(/[\u0080-\uFFFF]/g, (c) => `&#${c.charCodeAt(0)};`);
  }
  return out;
}

const REVERSE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00A0",
  copy: "\u00A9",
  reg: "\u00AE",
};

/** Decode named and numeric (decimal/hex) HTML entities. */
export function decodeEntities(input: string): string {
  if (!input) return "";
  return input.replace(
    /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g,
    (whole, body: string) => {
      if (body[0] === "#") {
        const isHex = body[1] === "x" || body[1] === "X";
        const code = parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
        if (Number.isNaN(code)) return whole;
        try {
          return String.fromCodePoint(code);
        } catch {
          return whole;
        }
      }
      const named = REVERSE[body];
      return named ?? whole;
    },
  );
}
