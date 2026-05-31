const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
};

function decodeEntities(text: string): string {
  let out = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  );
  out = out.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)));
  return out.replace(/&[a-zA-Z]+;/g, (m) => ENTITIES[m] ?? m);
}

/** Strip HTML tags and decode entities into readable plain text. */
export function htmlToText(html: string): string {
  if (!html.trim()) return "";
  let t = html;
  // Drop script/style content entirely.
  t = t.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");
  // Turn block-level boundaries into line breaks.
  t = t.replace(/<br\s*\/?>/gi, "\n");
  t = t.replace(
    /<\/(p|div|h[1-6]|li|ul|ol|tr|table|section|article|header|footer|blockquote)>/gi,
    "\n"
  );
  // Remove all remaining tags.
  t = t.replace(/<[^>]+>/g, "");
  t = decodeEntities(t);
  // Tidy whitespace.
  t = t
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return t;
}
