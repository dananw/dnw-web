export interface FormatSuccess {
  ok: true;
  result: string;
}

export interface FormatError {
  ok: false;
  message: string;
  line?: number;
  column?: number;
}

export type FormatResult = FormatSuccess | FormatError;

/**
 * Derive a 1-based line/column from a character position in the source.
 * Used to turn JSON.parse's "position N" errors into something readable.
 */
function locate(
  source: string,
  position: number,
): { line: number; column: number } {
  let line = 1;
  let column = 1;
  for (let i = 0; i < position && i < source.length; i++) {
    if (source[i] === "\n") {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

function parseError(source: string, err: unknown): FormatError {
  const message = err instanceof Error ? err.message : "Invalid JSON";
  // V8/most engines include "at position N"; some also add line/column.
  const posMatch = message.match(/position\s+(\d+)/i);
  if (posMatch) {
    const { line, column } = locate(source, Number(posMatch[1]));
    return { ok: false, message, line, column };
  }
  const lineMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  if (lineMatch) {
    return {
      ok: false,
      message,
      line: Number(lineMatch[1]),
      column: Number(lineMatch[2]),
    };
  }
  return { ok: false, message };
}

/** Beautify JSON with the given indent (number of spaces or "\t"). */
export function beautifyJson(
  source: string,
  indent: number | "\t" = 2,
): FormatResult {
  if (!source.trim()) return { ok: true, result: "" };
  try {
    const parsed = JSON.parse(source);
    return { ok: true, result: JSON.stringify(parsed, null, indent) };
  } catch (err) {
    return parseError(source, err);
  }
}

/** Collapse JSON to a single line. */
export function minifyJson(source: string): FormatResult {
  if (!source.trim()) return { ok: true, result: "" };
  try {
    const parsed = JSON.parse(source);
    return { ok: true, result: JSON.stringify(parsed) };
  } catch (err) {
    return parseError(source, err);
  }
}
