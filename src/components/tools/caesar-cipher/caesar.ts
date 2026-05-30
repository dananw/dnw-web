/** Shift every ASCII letter by `shift` positions, wrapping within its case. */
export function caesarShift(text: string, shift: number): string {
  const s = ((Math.trunc(shift) % 26) + 26) % 26;
  return text.replace(/[a-z]/gi, (ch) => {
    const code = ch.charCodeAt(0);
    const base = code <= 90 ? 65 : 97; // 'Z' is 90
    return String.fromCharCode(((code - base + s) % 26) + base);
  });
}

/** Decode by shifting in the opposite direction. */
export function caesarUnshift(text: string, shift: number): string {
  return caesarShift(text, -shift);
}

/** The classic ROT13 (its own inverse). */
export function rot13(text: string): string {
  return caesarShift(text, 13);
}
