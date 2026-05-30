export type Alignment = "left" | "center" | "right";

export interface MarkdownOptions {
  /** Treat the first row as the table header. */
  header: boolean;
  alignment: Alignment;
}

/** Auto-detect the most likely delimiter from the first non-empty line. */
export function detectDelimiter(text: string): string {
  const line = text.split(/\r?\n/).find((l) => l.trim().length > 0) ?? "";
  const candidates = [",", ";", "\t", "|"];
  let best = ",";
  let bestCount = -1;
  for (const d of candidates) {
    const count = line.split(d).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return best;
}

/** Parse CSV text into a 2D array, honoring quoted fields and escaped quotes. */
export function parseCsv(text: string, delimiter = ","): string[][] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  let i = 0;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === delimiter) {
      endField();
      i += 1;
      continue;
    }
    if (c === "\r") {
      i += 1;
      continue;
    }
    if (c === "\n") {
      endRow();
      i += 1;
      continue;
    }
    field += c;
    i += 1;
  }
  // Flush the trailing field/row if the file didn't end with a newline.
  if (field.length > 0 || row.length > 0) endRow();

  // Drop fully-empty rows (e.g. a trailing blank line).
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>").trim();
}

function alignMarker(align: Alignment): string {
  switch (align) {
    case "center":
      return ":---:";
    case "right":
      return "---:";
    default:
      return ":---";
  }
}

export interface MarkdownResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Convert parsed CSV rows into a GitHub-flavored Markdown table. */
export function toMarkdownTable(
  rows: string[][],
  opts: MarkdownOptions
): MarkdownResult {
  if (!rows.length) return { ok: true, value: "" };

  const cols = Math.max(...rows.map((r) => r.length));
  const normalized = rows.map((r) => {
    const cells = r.map(escapeCell);
    while (cells.length < cols) cells.push("");
    return cells;
  });

  const headerCells = opts.header
    ? normalized[0]
    : Array.from({ length: cols }, (_, i) => `Column ${i + 1}`);
  const bodyRows = opts.header ? normalized.slice(1) : normalized;

  const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
  const separator = headerCells.map(() => alignMarker(opts.alignment));

  const out = [line(headerCells), line(separator), ...bodyRows.map(line)];
  return { ok: true, value: out.join("\n") };
}

/** Convenience: parse + convert in one call. */
export function csvToMarkdown(
  csv: string,
  opts: MarkdownOptions,
  delimiter?: string
): MarkdownResult {
  if (!csv.trim()) return { ok: true, value: "" };
  const d = delimiter ?? detectDelimiter(csv);
  const rows = parseCsv(csv, d);
  return toMarkdownTable(rows, opts);
}
