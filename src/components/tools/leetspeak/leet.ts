const LEET_MAP: Record<string, string> = {
  a: "4",
  b: "8",
  e: "3",
  g: "6",
  i: "1",
  l: "1",
  o: "0",
  s: "5",
  t: "7",
  z: "2",
};

/** Convert text into leetspeak (1337). */
export function toLeet(text: string): string {
  let out = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    out += LEET_MAP[lower] ?? ch;
  }
  return out;
}
