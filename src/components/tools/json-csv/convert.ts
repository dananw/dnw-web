export interface ConvertResult {
  ok: boolean;
  output: string;
  error?: string;
}

function escapeCsvCell(value: unknown): string {
  let str: string;
  if (value === null || value === undefined) str = "";
  else if (typeof value === "object") str = JSON.stringify(value);
  else str = String(value);

  // Quote if it contains comma, quote, or newline.
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Convert an array of flat-ish JSON objects to CSV. */
export function jsonToCsv(source: string): ConvertResult {
  if (!source.trim()) return { ok: true, output: "" };
  let data: unknown;
  try {
    data = JSON.parse(source);
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }
  if (!Array.isArray(data)) {
    return {
      ok: false,
      output: "",
      error: "Expected a JSON array of objects.",
    };
  }
  if (data.length === 0) return { ok: true, output: "" };

  // Collect the union of keys in first-seen order.
  const headers: string[] = [];
  const seen = new Set<string>();
  for (const row of data) {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      return {
        ok: false,
        output: "",
        error: "Every array item must be an object.",
      };
    }
    for (const k of Object.keys(row)) {
      if (!seen.has(k)) {
        seen.add(k);
        headers.push(k);
      }
    }
  }

  const lines = [headers.map(escapeCsvCell).join(",")];
  for (const row of data as Record<string, unknown>[]) {
    lines.push(headers.map((h) => escapeCsvCell(row[h])).join(","));
  }
  return { ok: true, output: lines.join("\n") };
}

/** Parse CSV text into rows of cells, honoring quotes and escaped quotes. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cell += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
      i++;
    } else if (ch === "\n" || ch === "\r") {
      // Handle \r\n as a single break.
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      i++;
    } else {
      cell += ch;
      i++;
    }
  }
  // Flush the last cell/row if there's trailing content.
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/** Convert CSV to a JSON array of objects, inferring numbers/booleans. */
export function csvToJson(source: string): ConvertResult {
  if (!source.trim()) return { ok: true, output: "" };
  const rows = parseCsv(source.replace(/\n+$/, ""));
  if (rows.length < 1) return { ok: true, output: "[]" };

  const headers = rows[0];
  const out: Record<string, unknown>[] = [];
  for (let r = 1; r < rows.length; r++) {
    const obj: Record<string, unknown> = {};
    headers.forEach((h, c) => {
      const raw = rows[r][c] ?? "";
      obj[h] = coerce(raw);
    });
    out.push(obj);
  }
  return { ok: true, output: JSON.stringify(out, null, 2) };
}

function coerce(value: string): unknown {
  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return value;
}
