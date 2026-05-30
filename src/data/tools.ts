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
];

export const toolCategoryLabels: Record<ToolCategory, string> = {
  text: "Text",
  dev: "Developer",
  format: "Formatting",
  misc: "Misc",
};

export const getTool = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const publishedTools = (): Tool[] =>
  tools.filter((t) => t.published !== false);
