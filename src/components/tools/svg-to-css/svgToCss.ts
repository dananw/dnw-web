export interface SvgResult {
  ok: boolean;
  dataUri: string;
  css: string;
  error?: string;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/**
 * URL-encode an SVG for use in a data URI. This is smaller than Base64 and
 * stays human-readable; we only escape the characters that actually matter.
 */
function encodeSvgForUri(svg: string): string {
  return svg
    .replace(/>\s+</g, "><") // collapse whitespace between tags
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/"/g, "'") // single quotes survive URIs better
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/&/g, "%26")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\{/g, "%7B")
    .replace(/\}/g, "%7D");
}

/** Build a data URI (URL-encoded or Base64) and a ready CSS background rule. */
export function svgToCss(svg: string, base64: boolean): SvgResult {
  const trimmed = svg.trim();
  if (!trimmed) return { ok: true, dataUri: "", css: "" };
  if (!/<svg[\s>]/i.test(trimmed)) {
    return { ok: false, dataUri: "", css: "", error: "That doesn't look like SVG markup" };
  }
  const dataUri = base64
    ? `data:image/svg+xml;base64,${utf8ToBase64(trimmed)}`
    : `data:image/svg+xml,${encodeSvgForUri(trimmed)}`;
  const css = `background-image: url("${dataUri}");`;
  return { ok: true, dataUri, css };
}
