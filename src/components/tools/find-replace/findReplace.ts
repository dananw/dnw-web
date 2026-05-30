export interface ReplaceOptions {
  regex: boolean;
  caseInsensitive: boolean;
  global: boolean;
}

export interface ReplaceResult {
  ok: boolean;
  value: string;
  count: number;
  error?: string;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Find/replace over `text`, supporting literal or regex patterns. */
export function findReplace(
  text: string,
  find: string,
  replace: string,
  opts: ReplaceOptions
): ReplaceResult {
  if (!find) return { ok: true, value: text, count: 0 };

  let flags = "";
  if (opts.global) flags += "g";
  if (opts.caseInsensitive) flags += "i";

  try {
    const pattern = opts.regex ? find : escapeRegExp(find);
    // Count matches with a guaranteed-global copy so we never mutate lastIndex
    // on a shared regex.
    const counter = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
    const matches = text.match(counter);
    const count = matches ? matches.length : 0;

    const re = new RegExp(pattern, flags);
    const value = text.replace(re, replace);
    return { ok: true, value, count };
  } catch (e) {
    return {
      ok: false,
      value: text,
      count: 0,
      error: e instanceof Error ? e.message : "Invalid pattern",
    };
  }
}
