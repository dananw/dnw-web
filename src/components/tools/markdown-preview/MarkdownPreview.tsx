"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markdownToHtml } from "./render";

const SAMPLE = `# Markdown Preview

A **live** preview with _inline_ styles and \`code\`.

## Features
- Lists
- [Links](https://example.com)
- ~~Strikethrough~~

> Blockquotes too.

\`\`\`js
const hi = "hello";
\`\`\``;

const MarkdownPreview = () => {
  const [input, setInput] = useState(SAMPLE);
  const [tab, setTab] = useState<"preview" | "html">("preview");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => markdownToHtml(input), [input]);

  const handleCopy = async () => {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="md-input"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Markdown
          </label>
          <textarea
            id="md-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-[28rem] w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>

        <div>
          <div className="mb-2 flex h-7 items-center justify-between">
            <div className="inline-flex rounded-md border border-border p-0.5">
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={`rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  tab === "preview"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setTab("html")}
                className={`rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  tab === "html"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                HTML
              </button>
            </div>
            {tab === "html" && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCopy}
                disabled={!html}
                className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy
                  </>
                )}
              </Button>
            )}
          </div>

          {tab === "preview" ? (
            <div
              className="md-preview h-[28rem] overflow-auto rounded-lg border border-border bg-card p-4 text-foreground"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <textarea
              readOnly
              value={html}
              spellCheck={false}
              className="h-[28rem] w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
            />
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Raw HTML in your input is escaped and shown as text, so the preview is
        safe. Supports headings, lists, links, images, blockquotes, code and
        more. All local.
      </p>
    </div>
  );
};

export default MarkdownPreview;
