export interface CharInfo {
  char: string;
  codePoint: number;
  hex: string;
  decimal: number;
  htmlEntity: string;
  utf8: string;
}

/** Break text into characters and describe each code point. */
export function inspect(text: string): CharInfo[] {
  if (!text) return [];
  const encoder = new TextEncoder();
  return Array.from(text).map((char) => {
    const codePoint = char.codePointAt(0) ?? 0;
    const utf8 = Array.from(encoder.encode(char))
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join(" ");
    return {
      char,
      codePoint,
      hex: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      decimal: codePoint,
      htmlEntity: `&#${codePoint};`,
      utf8,
    };
  });
}
