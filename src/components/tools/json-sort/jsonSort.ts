export type SortOrder = "asc" | "desc";

export interface SortResult {
  ok: boolean;
  value: string;
  error?: string;
}

function sortValue(value: unknown, order: SortOrder): unknown {
  if (Array.isArray(value)) {
    return value.map((v) => sortValue(v, order));
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(
      ([a], [b]) => a.localeCompare(b)
    );
    if (order === "desc") entries.reverse();
    const out: Record<string, unknown> = {};
    for (const [k, v] of entries) out[k] = sortValue(v, order);
    return out;
  }
  return value;
}

/** Recursively sort object keys and re-serialize (array order is preserved). */
export function sortJson(
  input: string,
  order: SortOrder,
  indent = 2
): SortResult {
  if (!input.trim()) return { ok: true, value: "" };
  try {
    const parsed = JSON.parse(input);
    return { ok: true, value: JSON.stringify(sortValue(parsed, order), null, indent) };
  } catch (e) {
    return {
      ok: false,
      value: "",
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
}
