import { Tool, ToolCategory } from "@/lib/types";

/**
 * Registry of all mini-tools. Adding a new tool is two steps:
 *   1. Add an entry here.
 *   2. Create src/app/tools/<slug>/page.tsx that renders its component.
 * The /tools index page is generated automatically from this list.
 */
export const tools: Tool[] = [
  {
    slug: "markdown-to-slack",
    title: "Markdown → Slack",
    description:
      "Convert standard Markdown into Slack's mrkdwn format so it pastes cleanly into messages.",
    tagline: "Paste Markdown, get Slack-ready text.",
    category: "format",
    tags: ["markdown", "slack", "formatting"],
    icon: "MessageSquare",
    published: true,
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description:
      "Beautify, minify, and validate JSON. Pinpoints parse errors with line and column.",
    tagline: "Beautify, minify & validate JSON.",
    category: "format",
    tags: ["json", "format", "validate"],
    icon: "Braces",
    published: true,
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description:
      "Decode a JSON Web Token's header and payload locally. Nothing is sent anywhere.",
    tagline: "Inspect a JWT, fully in your browser.",
    category: "dev",
    tags: ["jwt", "auth", "decode"],
    icon: "KeyRound",
    published: true,
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    description:
      "Convert text between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE and more.",
    tagline: "Switch between every naming case.",
    category: "text",
    tags: ["text", "case", "naming"],
    icon: "Type",
    published: true,
  },
  {
    slug: "url-encoder",
    title: "URL Encoder & Parser",
    description:
      "Encode or decode URL components and break a URL down into its parts and query parameters.",
    tagline: "Encode, decode & inspect URLs.",
    category: "dev",
    tags: ["url", "encode", "query"],
    icon: "Link2",
    published: true,
  },
  {
    slug: "base64",
    title: "Base64 Encode / Decode",
    description:
      "Convert text to and from Base64, with UTF-8 support and URL-safe output. Runs locally.",
    tagline: "Text ↔ Base64, in your browser.",
    category: "dev",
    tags: ["base64", "encode", "decode"],
    icon: "Binary",
    published: true,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description:
      "Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text using the Web Crypto API.",
    tagline: "SHA hashes, computed locally.",
    category: "dev",
    tags: ["hash", "sha", "crypto"],
    icon: "Hash",
    published: true,
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description:
      "Generate cryptographically random UUID v4 values in bulk and copy them in one click.",
    tagline: "Bulk random UUID v4 generator.",
    category: "dev",
    tags: ["uuid", "id", "generator"],
    icon: "Fingerprint",
    published: true,
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    description:
      "Convert between Unix timestamps and human-readable dates in local time, UTC and ISO 8601.",
    tagline: "Unix epoch ↔ human dates.",
    category: "dev",
    tags: ["unix", "timestamp", "date"],
    icon: "Clock",
    published: true,
  },
  {
    slug: "json-to-typescript",
    title: "JSON → TypeScript",
    description:
      "Turn any JSON sample into TypeScript interfaces, inferring types and nested shapes automatically.",
    tagline: "Generate TS interfaces from JSON.",
    category: "dev",
    tags: ["json", "typescript", "types"],
    icon: "FileCode2",
    published: true,
  },
  {
    slug: "json-yaml",
    title: "JSON ↔ YAML",
    description:
      "Convert configuration back and forth between JSON and YAML, with validation both ways.",
    tagline: "Convert config between JSON & YAML.",
    category: "dev",
    tags: ["json", "yaml", "config"],
    icon: "ArrowRightLeft",
    published: true,
  },
  {
    slug: "text-diff",
    title: "Text Diff",
    description:
      "Compare two blocks of text and highlight added, removed and changed lines side by side.",
    tagline: "Spot the difference between two texts.",
    category: "dev",
    tags: ["diff", "compare", "text"],
    icon: "GitCompare",
    published: true,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description:
      "Test regular expressions live with flags, highlighted matches and capture group details.",
    tagline: "Test regex with live match highlighting.",
    category: "dev",
    tags: ["regex", "pattern", "match"],
    icon: "Regex",
    published: true,
  },
  {
    slug: "cron-explainer",
    title: "Cron Explainer",
    description:
      "Translate a cron expression into plain English and preview its upcoming run times.",
    tagline: "Decode cron expressions to plain English.",
    category: "dev",
    tags: ["cron", "schedule", "explain"],
    icon: "CalendarClock",
    published: true,
  },
  {
    slug: "html-entities",
    title: "HTML Entity Encoder",
    description:
      "Encode and decode HTML entities like &amp;, &lt; and &gt; to safely display markup as text.",
    tagline: "Encode & decode HTML entities.",
    category: "dev",
    tags: ["html", "entities", "encode"],
    icon: "CodeXml",
    published: true,
  },
  {
    slug: "json-escape",
    title: "JSON String Escape",
    description:
      "Escape or unescape text for use inside a JSON string literal — quotes, newlines and unicode.",
    tagline: "Escape text into a JSON string.",
    category: "dev",
    tags: ["json", "escape", "string"],
    icon: "Quote",
    published: true,
  },
  {
    slug: "number-base",
    title: "Number Base Converter",
    description:
      "Convert integers between binary, octal, decimal and hexadecimal, plus arbitrary bases.",
    tagline: "Binary, octal, decimal & hex.",
    category: "dev",
    tags: ["binary", "hex", "base"],
    icon: "Calculator",
    published: true,
  },
  {
    slug: "json-csv",
    title: "JSON ↔ CSV",
    description:
      "Convert an array of JSON objects to CSV and back, handling quoting and nested values.",
    tagline: "Convert between JSON arrays and CSV.",
    category: "format",
    tags: ["json", "csv", "table"],
    icon: "Table",
    published: true,
  },
  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    description:
      "Write Markdown and see the rendered HTML live, with a copyable HTML output.",
    tagline: "Live Markdown to HTML preview.",
    category: "format",
    tags: ["markdown", "html", "preview"],
    icon: "Eye",
    published: true,
  },
  {
    slug: "word-counter",
    title: "Word & Character Counter",
    description:
      "Count words, characters, sentences and paragraphs, with an estimated reading time.",
    tagline: "Count words, chars & reading time.",
    category: "text",
    tags: ["count", "words", "text"],
    icon: "WholeWord",
    published: true,
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder paragraphs, sentences or words for mockups and layouts.",
    tagline: "Placeholder text on demand.",
    category: "text",
    tags: ["lorem", "placeholder", "dummy"],
    icon: "Pilcrow",
    published: true,
  },
  {
    slug: "slug-generator",
    title: "Slug Generator",
    description:
      "Turn any title into a clean, URL-friendly slug, transliterating accents and symbols.",
    tagline: "Titles into URL-friendly slugs.",
    category: "text",
    tags: ["slug", "url", "seo"],
    icon: "Tag",
    published: true,
  },
  {
    slug: "line-tools",
    title: "Line Tools",
    description:
      "Sort, deduplicate, reverse, shuffle and trim lines of text in one place.",
    tagline: "Sort, dedupe & reorder lines.",
    category: "text",
    tags: ["lines", "sort", "dedupe"],
    icon: "Rows3",
    published: true,
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    description:
      "Convert colors between HEX, RGB and HSL with a live swatch preview.",
    tagline: "HEX ↔ RGB ↔ HSL with preview.",
    category: "design",
    tags: ["color", "hex", "hsl"],
    icon: "Palette",
    published: true,
  },
  {
    slug: "contrast-checker",
    title: "Contrast Checker",
    description:
      "Check the contrast ratio between two colors against WCAG AA and AAA thresholds.",
    tagline: "WCAG contrast ratio checker.",
    category: "design",
    tags: ["contrast", "wcag", "a11y"],
    icon: "Contrast",
    published: true,
  },
];

export const toolCategoryLabels: Record<ToolCategory, string> = {
  dev: "Developer",
  format: "Formatting",
  text: "Text",
  design: "Design",
  misc: "Misc",
};

/** Short blurb shown under each category heading on the index page. */
export const toolCategoryDescriptions: Record<ToolCategory, string> = {
  dev: "Encoders, decoders, generators and converters for everyday coding.",
  format: "Clean up, validate and reshape structured data.",
  text: "Transform and inspect plain text.",
  design: "Colors, contrast and visual helpers.",
  misc: "Everything else.",
};

/** Render order for category sections on the index page. */
export const toolCategoryOrder: ToolCategory[] = [
  "dev",
  "format",
  "text",
  "design",
  "misc",
];

export const getTool = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const publishedTools = (): Tool[] =>
  tools.filter((t) => t.published !== false);

/**
 * Group published tools by category, returned in `toolCategoryOrder`.
 * Empty categories are omitted.
 */
export function toolsByCategory(): { category: ToolCategory; items: Tool[] }[] {
  const published = publishedTools();
  return toolCategoryOrder
    .map((category) => ({
      category,
      items: published.filter((t) => t.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
