// Characters that don't decompose under NFD normalization.
const SPECIALS: Record<string, string> = {
  ø: "o", Ø: "O", ł: "l", Ł: "L", đ: "d", Đ: "D", ð: "d", Ð: "D",
  æ: "ae", Æ: "AE", œ: "oe", Œ: "OE", ß: "ss", þ: "th", Þ: "Th",
  ı: "i", ﬁ: "fi", ﬂ: "fl",
};

/** Strip diacritics/accents from text (café -> cafe). */
export function removeAccents(text: string): string {
  if (!text) return "";
  const mapped = Array.from(text)
    .map((ch) => SPECIALS[ch] ?? ch)
    .join("");
  // NFD splits accented letters into base + combining mark; drop the marks.
  return mapped.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
