export interface EscapeResult {
  ok: boolean;
  output: string;
  error?: string;
}

/**
 * Escape arbitrary text so it can be embedded inside a JSON string literal.
 * Uses JSON.stringify and strips the surrounding quotes.
 */
export function escapeJson(input: string): string {
  if (!input) return "";
  const quoted = JSON.stringify(input);
  return quoted.slice(1, -1);
}

/**
 * Unescape a JSON string body back to raw text. Accepts the body with or
 * without surrounding double quotes.
 */
export function unescapeJson(input: string): EscapeResult {
  if (!input) return { ok: true, output: "" };
  const trimmed = input.trim();
  // If already wrapped in double quotes, parse as-is. Otherwise wrap the body
  // verbatim — it's presumed to already contain valid escape sequences, so we
  // must NOT re-escape it (that would corrupt existing backslashes).
  const wrapped =
    trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2
      ? trimmed
      : `"${trimmed}"`;
  try {
    const value = JSON.parse(wrapped);
    if (typeof value !== "string") {
      return { ok: false, output: "", error: "Not a JSON string." };
    }
    return { ok: true, output: value };
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : "Invalid escape sequence",
    };
  }
}
