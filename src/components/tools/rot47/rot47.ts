/**
 * ROT47 rotates every visible ASCII character (codes 33–126) by 47 places.
 * Like ROT13 it is its own inverse, so the same function encodes and decodes.
 */
export function rot47(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      out += String.fromCharCode(33 + ((code - 33 + 47) % 94));
    } else {
      out += text[i];
    }
  }
  return out;
}
