interface StyleDef {
  id: string;
  label: string;
  upper: number; // code point of 'A'
  lower: number; // code point of 'a'
  digit?: number; // code point of '0'
}

// Code point bases in the Unicode Mathematical Alphanumeric Symbols block.
export const STYLES: StyleDef[] = [
  { id: "bold", label: "Bold", upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
  { id: "italic", label: "Italic", upper: 0x1d434, lower: 0x1d44e },
  { id: "boldItalic", label: "Bold Italic", upper: 0x1d468, lower: 0x1d482 },
  { id: "script", label: "Script", upper: 0x1d49c, lower: 0x1d4b6 },
  { id: "boldScript", label: "Bold Script", upper: 0x1d4d0, lower: 0x1d4ea },
  { id: "fraktur", label: "Fraktur", upper: 0x1d504, lower: 0x1d51e },
  { id: "doubleStruck", label: "Double-struck", upper: 0x1d538, lower: 0x1d552, digit: 0x1d7d8 },
  { id: "sansSerif", label: "Sans-serif", upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 },
  { id: "sansBold", label: "Sans Bold", upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec },
  { id: "monospace", label: "Monospace", upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 },
];

/** Map ASCII letters/digits onto a styled Unicode alphabet. */
export function styleText(text: string, styleId: string): string {
  const style = STYLES.find((s) => s.id === styleId);
  if (!style) return text;
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= 65 && code <= 90) {
      out += String.fromCodePoint(style.upper + (code - 65));
    } else if (code >= 97 && code <= 122) {
      out += String.fromCodePoint(style.lower + (code - 97));
    } else if (style.digit && code >= 48 && code <= 57) {
      out += String.fromCodePoint(style.digit + (code - 48));
    } else {
      out += ch;
    }
  }
  return out;
}
