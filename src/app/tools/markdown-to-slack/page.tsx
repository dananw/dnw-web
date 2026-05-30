import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MarkdownToSlack from "@/components/tools/markdown-to-slack/MarkdownToSlack";
import { getTool } from "@/data/tools";

const tool = getTool("markdown-to-slack")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function MarkdownToSlackPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <MarkdownToSlack />
    </ToolPageShell>
  );
}
