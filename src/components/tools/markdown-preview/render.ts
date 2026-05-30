/**
 * Minimal, SAFE Markdown -> HTML renderer.
 *
 * Security: the input is HTML-escaped FIRST, so any raw HTML in the source is
 * rendered as text, never executed. Only the markdown constructs below produce
 * real tags. This avoids XSS without needing a sanitizer library.
 *
 * Supported: headings, bold, italic, strikethrough, inline code, fenced code,
 * links, images, blockquotes, unordered/ordered lists, horizontal rules,
 * paragraphs.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text: string): string {
  let t = text;
  // images ![alt](url)
  t = t.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt: string, url: string) =>
      `<img src="${encodeURI(url)}" alt="${alt}" />`,
  );
  // links [text](url)
  t = t.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label: string, url: string) =>
      `<a href="${encodeURI(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`,
  );
  // bold
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // italic
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  t = t.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, "$1<em>$2</em>");
  // strikethrough
  t = t.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  // inline code
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  return t;
}

export function markdownToHtml(src: string): string {
  if (!src) return "";
  const escaped = escapeHtml(src.replace(/\r\n/g, "\n"));
  const lines = escaped.split("\n");

  const html: string[] = [];
  let i = 0;
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      closeList();
      const lang = fence[1];
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const cls = lang ? ` class="language-${lang}"` : "";
      html.push(`<pre><code${cls}>${buf.join("\n")}</code></pre>`);
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      closeList();
      html.push("<hr />");
      i++;
      continue;
    }

    // Blockquote
    if (/^&gt;\s?/.test(line)) {
      closeList();
      const quote = line.replace(/^&gt;\s?/, "");
      html.push(`<blockquote>${inline(quote)}</blockquote>`);
      i++;
      continue;
    }

    // Unordered list item
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) {
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${inline(ul[1])}</li>`);
      i++;
      continue;
    }

    // Ordered list item
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${inline(ol[1])}</li>`);
      i++;
      continue;
    }

    // Blank line
    if (/^\s*$/.test(line)) {
      closeList();
      i++;
      continue;
    }

    // Paragraph (merge consecutive non-blank, non-special lines)
    closeList();
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^(#{1,6})\s/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^\s*[-*+]\s/.test(lines[i]) &&
      !/^\s*\d+\.\s/.test(lines[i]) &&
      !/^&gt;\s?/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    html.push(`<p>${inline(para.join(" "))}</p>`);
  }

  closeList();
  return html.join("\n");
}
