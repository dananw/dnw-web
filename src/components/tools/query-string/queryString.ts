export interface QueryPair {
  key: string;
  value: string;
}

export interface ParseResult {
  ok: boolean;
  pairs: QueryPair[];
  json: string;
  error?: string;
}

/**
 * Parse a query string or full URL into ordered key/value pairs plus a JSON
 * object (repeated keys collapse into arrays).
 */
export function parseQueryString(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, pairs: [], json: "" };

  let queryPart = trimmed;
  // If a full URL was pasted, keep only the part after "?".
  const qIndex = trimmed.indexOf("?");
  if (qIndex !== -1) queryPart = trimmed.slice(qIndex + 1);
  // Drop a trailing hash fragment.
  const hashIndex = queryPart.indexOf("#");
  if (hashIndex !== -1) queryPart = queryPart.slice(0, hashIndex);

  try {
    const params = new URLSearchParams(queryPart);
    const pairs: QueryPair[] = [];
    params.forEach((value, key) => pairs.push({ key, value }));

    const obj: Record<string, string | string[]> = {};
    for (const { key, value } of pairs) {
      if (key in obj) {
        const existing = obj[key];
        obj[key] = Array.isArray(existing)
          ? [...existing, value]
          : [existing as string, value];
      } else {
        obj[key] = value;
      }
    }
    return {
      ok: true,
      pairs,
      json: pairs.length ? JSON.stringify(obj, null, 2) : "",
    };
  } catch (e) {
    return {
      ok: false,
      pairs: [],
      json: "",
      error: e instanceof Error ? e.message : "Invalid query string",
    };
  }
}
