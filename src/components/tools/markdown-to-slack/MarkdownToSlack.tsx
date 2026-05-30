"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markdownToSlack } from "./convert";

const SAMPLE = `# Release notes

We shipped **dark mode** and fixed a few _annoying_ bugs.

- [Changelog](https://example.com/changelog)
- Use \`npm run build\` before deploy
- ~~Old flow~~ is removed

Thanks everyone!`;

const MarkdownToSlack = () => {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => markdownToSlack(input), [input]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — silently ignore.
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="md-input"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Markdown
            </label>
            <button
              type="button"
              onClick={() => setInput("")}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          </div>
          <textarea
            id="md-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your Markdown here…"
            className="h-80 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="mb-2 flex h-7 items-center justify-between">
            <label
              htmlFor="md-output"
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Slack mrkdwn
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!output}
              className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <textarea
            id="md-output"
            value={output}
            readOnly
            spellCheck={false}
            className="h-80 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Everything runs locally in your browser. Bold, italic, strikethrough,
        links, headings, and lists are converted to Slack&apos;s format. Code
        spans and fenced blocks are left untouched.
      </p>
    </div>
  );
};

export default MarkdownToSlack;
