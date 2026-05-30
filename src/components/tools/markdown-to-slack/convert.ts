/**
 * Convert standard Markdown to Slack's "mrkdwn" syntax.
 *
 * Slack differs from Markdown in several ways:
 *   **bold**      -> *bold*
 *   *italic*      -> _italic_
 *   ~~strike~~    -> ~strike~
 *   [text](url)   -> <url|text>
 *   # Heading     -> *Heading*   (Slack has no headings)
 *   - bullet      -> • bullet
 *
 * Code spans and fenced code blocks are preserved verbatim so their contents
 * are never reformatted.
 */
export function markdownToSlack(input: string): string {
  if (!input) return "";

  const placeholders: string[] = [];
  const stash = (value: string): string => {
    const token = `\u0000${placeholders.length}\u0000`;
    placeholders.push(value);
    return token;
  };

  let text = input.replace(/\r\n/g, "\n");

  // 1. Protect fenced code blocks (``` ... ```), kept as-is for Slack.
  text = text.replace(/```[\s\S]*?```/g, (m) => stash(m));

  // 2. Protect inline code (`code`).
  text = text.replace(/`[^`\n]+`/g, (m) => stash(m));

  // 3. Links: [label](url) -> <url|label>
  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (_, label: string, url: string) => `<${url}|${label}>`,
  );

  // 4. Images: ![alt](url) -> <url|alt>  (handled before links above? do after)
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt: string, url: string) => (alt ? `<${url}|${alt}>` : `<${url}>`),
  );

  // 5. Headings (#, ##, ...) -> bold line. Stash so italics pass skips it.
  text = text.replace(/^#{1,6}\s+(.*)$/gm, (_, content: string) => {
    const trimmed = content.trim();
    return trimmed ? stash(`*${trimmed}*`) : "";
  });

  // 6. Bold: **text** or __text__ -> Slack *text*.
  //    Stash the finished Slack form so the italic pass below can't mistake
  //    its single asterisks for italic markers.
  text = text.replace(/\*\*([^*\n]+)\*\*/g, (_, t: string) => stash(`*${t}*`));
  text = text.replace(/__([^_\n]+)__/g, (_, t: string) => stash(`*${t}*`));

  // 7. Italic: *text* or _text_ -> _text_
  //    Bold is already stashed, so any remaining single * pair is italic.
  text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1_$2_");
  // _text_ already matches Slack italics, leave as-is.

  // 8. Strikethrough: ~~text~~ -> ~text~
  text = text.replace(/~~([^~\n]+)~~/g, "~$1~");

  // 9. Unordered list markers (-, *, +) -> bullet. Preserve indentation.
  text = text.replace(/^(\s*)[-*+]\s+/gm, "$1• ");

  // 10. Horizontal rules (---, ***, ___) -> a thin divider line.
  text = text.replace(/^\s*([-*_])\1{2,}\s*$/gm, "──────────");

  // Restore protected segments.
  text = text.replace(/\u0000(\d+)\u0000/g, (_, i: string) => placeholders[+i]);

  return text;
}
