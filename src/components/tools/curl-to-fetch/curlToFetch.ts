export interface CurlResult {
  ok: boolean;
  code: string;
  error?: string;
}

/** Split a shell-ish command respecting single/double quotes and line escapes. */
function tokenize(input: string): string[] {
  const s = input.replace(/\\\r?\n/g, " ");
  const tokens: string[] = [];
  let i = 0;
  while (i < s.length) {
    if (/\s/.test(s[i])) {
      i++;
      continue;
    }
    let tok = "";
    while (i < s.length && !/\s/.test(s[i])) {
      const c = s[i];
      if (c === "'") {
        i++;
        while (i < s.length && s[i] !== "'") tok += s[i++];
        i++;
        continue;
      }
      if (c === '"') {
        i++;
        while (i < s.length && s[i] !== '"') {
          if (s[i] === "\\" && i + 1 < s.length) {
            tok += s[i + 1];
            i += 2;
            continue;
          }
          tok += s[i++];
        }
        i++;
        continue;
      }
      tok += c;
      i++;
    }
    tokens.push(tok);
  }
  return tokens;
}

const VALUE_FLAGS = new Set([
  "-X", "--request", "-H", "--header", "-d", "--data", "--data-raw",
  "--data-binary", "--data-urlencode", "-u", "--user", "-b", "--cookie",
  "-e", "--referer", "-A", "--user-agent",
]);

/** Convert a curl command into equivalent JavaScript fetch() code. */
export function curlToFetch(input: string): CurlResult {
  if (!input.trim()) return { ok: true, code: "" };

  const tokens = tokenize(input.trim());
  if (!tokens.length || !/curl/i.test(tokens[0])) {
    return { ok: false, code: "", error: "Command should start with curl" };
  }

  let url = "";
  let method = "";
  const headers: Record<string, string> = {};
  const dataParts: string[] = [];

  for (let i = 1; i < tokens.length; i++) {
    const t = tokens[i];
    const takesValue = VALUE_FLAGS.has(t);
    const next = takesValue ? tokens[++i] ?? "" : "";

    if (t === "-X" || t === "--request") method = next.toUpperCase();
    else if (t === "-H" || t === "--header") {
      const idx = next.indexOf(":");
      if (idx > -1) headers[next.slice(0, idx).trim()] = next.slice(idx + 1).trim();
    } else if (t === "-u" || t === "--user") {
      headers["Authorization"] = `Basic ${btoa(next)}`;
    } else if (t === "-A" || t === "--user-agent") headers["User-Agent"] = next;
    else if (t === "-e" || t === "--referer") headers["Referer"] = next;
    else if (t === "-b" || t === "--cookie") headers["Cookie"] = next;
    else if (
      t === "-d" || t === "--data" || t === "--data-raw" ||
      t === "--data-binary" || t === "--data-urlencode"
    ) {
      dataParts.push(next);
    } else if (!t.startsWith("-") && !url) {
      url = t;
    }
  }

  if (!url) return { ok: false, code: "", error: "No URL found in the command" };
  if (dataParts.length && !method) method = "POST";
  if (!method) method = "GET";

  const body = dataParts.join("&");
  const lines: string[] = [];
  lines.push(`const options = {`);
  lines.push(`  method: ${JSON.stringify(method)},`);
  if (Object.keys(headers).length) {
    lines.push(`  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, "\n  ")},`);
  }
  if (body) lines.push(`  body: ${JSON.stringify(body)},`);
  lines.push(`};`);

  const code = [
    `const url = ${JSON.stringify(url)};`,
    lines.join("\n"),
    ``,
    `const response = await fetch(url, options);`,
    `const data = await response.json();`,
    `console.log(data);`,
  ].join("\n");

  return { ok: true, code };
}
