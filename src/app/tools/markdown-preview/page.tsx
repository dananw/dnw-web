import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MarkdownPreview from "@/components/tools/markdown-preview/MarkdownPreview";
import { getTool } from "@/data/tools";

const tool = getTool("markdown-preview")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function MarkdownPreviewPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <MarkdownPreview />
    </ToolPageShell>
  );
}
