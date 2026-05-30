export interface GenResult {
  ok: boolean;
  output: string;
  error?: string;
}

type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

const VALID_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function pascal(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9]+/g, " ").trim();
  if (!cleaned) return "Generated";
  return cleaned
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/** Singularize a name for array element interfaces (items -> Item). */
function singular(name: string): string {
  if (/ies$/i.test(name)) return name.replace(/ies$/i, "y");
  if (/s$/i.test(name) && !/ss$/i.test(name)) return name.replace(/s$/i, "");
  return name;
}

interface Context {
  interfaces: Map<string, string>; // name -> body
  order: string[];
}

function uniqueName(ctx: Context, base: string): string {
  let name = base || "Generated";
  let i = 2;
  while (ctx.interfaces.has(name)) {
    name = `${base}${i++}`;
  }
  return name;
}

function mergeKeys(items: Record<string, Json>[]): {
  keys: string[];
  optional: Set<string>;
  values: Map<string, Json[]>;
} {
  const keys: string[] = [];
  const values = new Map<string, Json[]>();
  const counts = new Map<string, number>();
  for (const obj of items) {
    for (const k of Object.keys(obj)) {
      if (!values.has(k)) {
        values.set(k, []);
        keys.push(k);
      }
      values.get(k)!.push(obj[k]);
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
  }
  const optional = new Set<string>();
  for (const k of keys) {
    if ((counts.get(k) ?? 0) < items.length) optional.add(k);
  }
  return { keys, optional, values };
}

function typeOf(value: Json, ctx: Context, nameHint: string): string {
  if (value === null) return "null";
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const elemName = singular(nameHint);
    const elemTypes = new Set(value.map((v) => typeOf(v, ctx, elemName)));
    const union = [...elemTypes].join(" | ");
    return elemTypes.size > 1 ? `(${union})[]` : `${union}[]`;
  }
  // Object -> dedicated interface.
  return buildInterface([value as Record<string, Json>], ctx, nameHint);
}

function buildInterface(
  objects: Record<string, Json>[],
  ctx: Context,
  nameHint: string,
): string {
  const name = uniqueName(ctx, pascal(nameHint));
  // Reserve the name immediately to avoid collisions during recursion.
  ctx.interfaces.set(name, "");
  ctx.order.push(name);

  const { keys, optional, values } = mergeKeys(objects);
  const lines: string[] = [];
  for (const key of keys) {
    const vals = values.get(key)!;
    const nonNull = vals.filter((v) => v !== null);
    const sample = nonNull.length ? nonNull : vals;
    const types = new Set(sample.map((v) => typeOf(v, ctx, key)));
    if (vals.some((v) => v === null)) types.add("null");
    const typeStr = [...types].join(" | ") || "unknown";
    const safeKey = VALID_KEY.test(key) ? key : JSON.stringify(key);
    const opt = optional.has(key) ? "?" : "";
    lines.push(`  ${safeKey}${opt}: ${typeStr};`);
  }

  const body = `export interface ${name} {\n${lines.join("\n")}\n}`;
  ctx.interfaces.set(name, body);
  return name;
}

export function jsonToTypeScript(source: string, rootName = "Root"): GenResult {
  if (!source.trim()) return { ok: true, output: "" };
  let parsed: Json;
  try {
    parsed = JSON.parse(source);
  } catch (err) {
    return {
      ok: false,
      output: "",
      error: err instanceof Error ? err.message : "Invalid JSON",
    };
  }

  const ctx: Context = { interfaces: new Map(), order: [] };

  if (Array.isArray(parsed)) {
    const objs = parsed.filter(
      (v): v is Record<string, Json> =>
        v !== null && typeof v === "object" && !Array.isArray(v),
    );
    if (objs.length === parsed.length && objs.length > 0) {
      const elem = buildInterface(objs, ctx, singular(rootName));
      const root = `export type ${pascal(rootName)} = ${elem}[];`;
      const defs = ctx.order.map((n) => ctx.interfaces.get(n)).join("\n\n");
      return { ok: true, output: `${defs}\n\n${root}` };
    }
    const t = typeOf(parsed, ctx, rootName);
    const defs = ctx.order.map((n) => ctx.interfaces.get(n)).join("\n\n");
    const root = `export type ${pascal(rootName)} = ${t};`;
    return { ok: true, output: defs ? `${defs}\n\n${root}` : root };
  }

  if (parsed !== null && typeof parsed === "object") {
    buildInterface([parsed as Record<string, Json>], ctx, rootName);
    const defs = ctx.order.map((n) => ctx.interfaces.get(n)).join("\n\n");
    return { ok: true, output: defs };
  }

  // Primitive root.
  const t = typeOf(parsed, ctx, rootName);
  return { ok: true, output: `export type ${pascal(rootName)} = ${t};` };
}
