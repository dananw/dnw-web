export interface CsvJsonResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Auto-detect the most likely delimiter from the first non-empty line. */
function detectDelimiter(text: string): string {
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
function parseCsv(text: string, delimiter: string): string[][] {
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
  if (field.length > 0 || row.length > 0) endRow();
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

/**
 * Convert CSV into JSON. With a header row, each record becomes an object keyed
 * by the header; otherwise each row becomes an array of strings.
 */
export function csvToJson(
  csv: string,
  header: boolean,
  delimiter?: string
): CsvJsonResult {
  if (!csv.trim()) return { ok: true, value: "" };

  const d = delimiter ?? detectDelimiter(csv);
  const rows = parseCsv(csv, d);
  if (!rows.length) return { ok: true, value: "[]" };

  let data: unknown;
  if (header) {
    const keys = rows[0];
    data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      keys.forEach((key, i) => {
        obj[key || `column${i + 1}`] = row[i] ?? "";
      });
      return obj;
    });
  } else {
    data = rows;
  }

  return { ok: true, value: JSON.stringify(data, null, 2) };
}
