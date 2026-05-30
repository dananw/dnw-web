export interface XmlResult {
  ok: boolean;
  value: string;
  error?: string;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Make a string a valid XML element name. */
function sanitizeName(name: string): string {
  let n = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  if (!/^[a-zA-Z_]/.test(n)) n = `_${n}`;
  return n || "_";
}

function buildNode(key: string, value: unknown, level: number, indent: string): string {
  const pad = indent.repeat(level);
  if (value === null || value === undefined) {
    return `${pad}<${key}/>`;
  }
  if (Array.isArray(value)) {
    // Repeat the element once per array item.
    return value.map((item) => buildNode(key, item, level, indent)).join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${pad}<${key}/>`;
    const inner = entries
      .map(([k, v]) => buildNode(sanitizeName(k), v, level + 1, indent))
      .join("\n");
    return `${pad}<${key}>\n${inner}\n${pad}</${key}>`;
  }
  return `${pad}<${key}>${escapeXml(String(value))}</${key}>`;
}

/** Convert a JSON string into indented XML. */
export function jsonToXml(input: string, rootName = "root", indent = "  "): XmlResult {
  if (!input.trim()) return { ok: true, value: "" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    return { ok: false, value: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }

  const root = sanitizeName(rootName);
  let body: string;
  if (Array.isArray(parsed)) {
    const inner = parsed.map((item) => buildNode("item", item, 1, indent)).join("\n");
    body = inner ? `<${root}>\n${inner}\n</${root}>` : `<${root}/>`;
  } else {
    body = buildNode(root, parsed, 0, indent);
  }
  return { ok: true, value: `<?xml version="1.0" encoding="UTF-8"?>\n${body}` };
}
