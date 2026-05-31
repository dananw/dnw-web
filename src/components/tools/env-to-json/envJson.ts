export interface ConvertResult {
  ok: boolean;
  value: string;
  error?: string;
}

function stripQuotes(value: string): string {
  const v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

/** Parse a dotenv file into pretty JSON. */
export function envToJson(input: string): ConvertResult {
  if (!input.trim()) return { ok: true, value: "" };
  const obj: Record<string, string> = {};
  const lines = input.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const withoutExport = line.replace(/^export\s+/, "");
    const eq = withoutExport.indexOf("=");
    if (eq === -1) continue;
    const key = withoutExport.slice(0, eq).trim();
    if (!key) continue;
    obj[key] = stripQuotes(withoutExport.slice(eq + 1));
  }
  return { ok: true, value: JSON.stringify(obj, null, 2) };
}

/** Serialize a flat JSON object back into dotenv lines. */
export function jsonToEnv(input: string): ConvertResult {
  if (!input.trim()) return { ok: true, value: "" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    return { ok: false, value: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false, value: "", error: "Provide a JSON object" };
  }

  const lines = Object.entries(parsed as Record<string, unknown>).map(([key, value]) => {
    const str =
      value === null || value === undefined
        ? ""
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
    // Quote values containing whitespace, # or quotes.
    const needsQuotes = /[\s#"']/.test(str);
    return `${key}=${needsQuotes ? `"${str.replace(/"/g, '\\"')}"` : str}`;
  });
  return { ok: true, value: lines.join("\n") };
}
