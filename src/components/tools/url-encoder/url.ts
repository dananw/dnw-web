export function encodeComponent(input: string): string {
  try {
    return encodeURIComponent(input);
  } catch {
    return "";
  }
}

export function decodeComponent(input: string): string {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch {
    // Malformed percent-encoding.
    return input;
  }
}

export interface ParsedUrl {
  ok: boolean;
  protocol?: string;
  host?: string;
  port?: string;
  pathname?: string;
  hash?: string;
  params: { key: string; value: string }[];
}

/**
 * Parse a URL into its parts and query parameters. Falls back gracefully when
 * the input isn't an absolute URL by trying a dummy base.
 */
export function parseUrl(input: string): ParsedUrl {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, params: [] };

  let url: URL | null = null;
  try {
    url = new URL(trimmed);
  } catch {
    try {
      // Relative URL or bare path/query — parse against a placeholder base.
      url = new URL(trimmed, "http://_placeholder_");
    } catch {
      return { ok: false, params: [] };
    }
  }

  const params: { key: string; value: string }[] = [];
  url.searchParams.forEach((value, key) => params.push({ key, value }));

  const isPlaceholder = url.host === "_placeholder_";

  return {
    ok: true,
    protocol: isPlaceholder ? undefined : url.protocol.replace(/:$/, ""),
    host: isPlaceholder ? undefined : url.hostname,
    port: url.port || undefined,
    pathname: url.pathname || undefined,
    hash: url.hash ? url.hash.replace(/^#/, "") : undefined,
    params,
  };
}
