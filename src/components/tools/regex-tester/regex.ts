export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
  named: Record<string, string>;
}

export interface RegexResult {
  ok: boolean;
  error?: string;
  matches: RegexMatch[];
}

/**
 * Run a regex against text. Always evaluates globally for match listing, but
 * respects the user's other flags. Guards against zero-width infinite loops.
 */
export function runRegex(
  pattern: string,
  flags: string,
  text: string,
): RegexResult {
  if (!pattern) return { ok: true, matches: [] };

  // Ensure global flag so we can enumerate all matches.
  const effectiveFlags = flags.includes("g") ? flags : flags + "g";

  let re: RegExp;
  try {
    re = new RegExp(pattern, effectiveFlags);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Invalid regular expression",
      matches: [],
    };
  }

  const matches: RegexMatch[] = [];
  let m: RegExpExecArray | null;
  let guard = 0;
  while ((m = re.exec(text)) !== null) {
    matches.push({
      index: m.index,
      match: m[0],
      groups: m.slice(1).map((g) => g ?? ""),
      named: { ...(m.groups ?? {}) },
    });
    // Avoid infinite loops on zero-width matches.
    if (m.index === re.lastIndex) re.lastIndex++;
    if (++guard > 10000) break;
  }

  return { ok: true, matches };
}

/** Build segments of text marked as match/non-match for highlighting. */
export function highlightSegments(
  text: string,
  matches: RegexMatch[],
): { text: string; match: boolean }[] {
  if (!matches.length) return [{ text, match: false }];
  const segments: { text: string; match: boolean }[] = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.index > cursor) {
      segments.push({ text: text.slice(cursor, m.index), match: false });
    }
    segments.push({ text: m.match, match: true });
    cursor = m.index + m.match.length;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), match: false });
  }
  return segments;
}
