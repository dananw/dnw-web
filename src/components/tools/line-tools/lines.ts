export function splitLines(text: string): string[] {
  return text.replace(/\r\n/g, "\n").split("\n");
}

export function sortAsc(text: string): string {
  return splitLines(text)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
}

export function sortDesc(text: string): string {
  return splitLines(text)
    .sort((a, b) => b.localeCompare(a))
    .join("\n");
}

export function dedupe(text: string): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of splitLines(text)) {
    if (!seen.has(line)) {
      seen.add(line);
      out.push(line);
    }
  }
  return out.join("\n");
}

export function reverse(text: string): string {
  return splitLines(text).reverse().join("\n");
}

export function shuffle(text: string): string {
  const lines = splitLines(text);
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }
  return lines.join("\n");
}

export function trimEach(text: string): string {
  return splitLines(text)
    .map((l) => l.trim())
    .join("\n");
}

export function removeEmpty(text: string): string {
  return splitLines(text)
    .filter((l) => l.trim() !== "")
    .join("\n");
}
