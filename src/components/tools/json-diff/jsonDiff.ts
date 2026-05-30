export type ChangeType = "added" | "removed" | "changed";

export interface Change {
  path: string;
  type: ChangeType;
  before?: string;
  after?: string;
}

export interface DiffResult {
  ok: boolean;
  changes: Change[];
  error?: string;
}

function kind(v: unknown): string {
  if (Array.isArray(v)) return "array";
  if (v === null) return "null";
  return typeof v;
}

function preview(v: unknown): string {
  const s = JSON.stringify(v);
  return s.length > 80 ? s.slice(0, 77) + "…" : s;
}

function walk(a: unknown, b: unknown, path: string, out: Change[]): void {
  if (JSON.stringify(a) === JSON.stringify(b)) return;

  const ka = kind(a);
  const kb = kind(b);

  if (ka === "object" && kb === "object") {
    const ao = a as Record<string, unknown>;
    const bo = b as Record<string, unknown>;
    const keys = new Set([...Object.keys(ao), ...Object.keys(bo)]);
    for (const key of [...keys].sort()) {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in ao)) out.push({ path: childPath, type: "added", after: preview(bo[key]) });
      else if (!(key in bo)) out.push({ path: childPath, type: "removed", before: preview(ao[key]) });
      else walk(ao[key], bo[key], childPath, out);
    }
    return;
  }

  if (ka === "array" && kb === "array") {
    const aa = a as unknown[];
    const ba = b as unknown[];
    const len = Math.max(aa.length, ba.length);
    for (let i = 0; i < len; i++) {
      const childPath = `${path}[${i}]`;
      if (i >= aa.length) out.push({ path: childPath, type: "added", after: preview(ba[i]) });
      else if (i >= ba.length) out.push({ path: childPath, type: "removed", before: preview(aa[i]) });
      else walk(aa[i], ba[i], childPath, out);
    }
    return;
  }

  out.push({ path: path || "(root)", type: "changed", before: preview(a), after: preview(b) });
}

/** Structurally diff two JSON documents. */
export function jsonDiff(leftText: string, rightText: string): DiffResult {
  if (!leftText.trim() || !rightText.trim()) return { ok: true, changes: [] };
  let left: unknown;
  let right: unknown;
  try {
    left = JSON.parse(leftText);
  } catch (e) {
    return { ok: false, changes: [], error: `Left side: ${e instanceof Error ? e.message : "invalid JSON"}` };
  }
  try {
    right = JSON.parse(rightText);
  } catch (e) {
    return { ok: false, changes: [], error: `Right side: ${e instanceof Error ? e.message : "invalid JSON"}` };
  }

  const changes: Change[] = [];
  walk(left, right, "", changes);
  return { ok: true, changes };
}
