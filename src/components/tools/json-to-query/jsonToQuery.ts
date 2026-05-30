export interface QueryResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Convert a flat JSON object into a URL query string. */
export function jsonToQuery(input: string): QueryResult {
  if (!input.trim()) return { ok: true, value: "" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    return { ok: false, value: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false, value: "", error: "Provide a JSON object (key/value pairs)" };
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, stringify(item));
    } else {
      params.append(key, stringify(value));
    }
  }
  return { ok: true, value: params.toString() };
}

function stringify(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
