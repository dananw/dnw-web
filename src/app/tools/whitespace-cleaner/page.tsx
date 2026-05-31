import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WhitespaceCleaner from "@/components/tools/whitespace-cleaner/WhitespaceCleaner";
import { getTool } from "@/data/tools";

const tool = getTool("whitespace-cleaner")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function WhitespaceCleanerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <WhitespaceCleaner />
    </ToolPageShell>
  );
}
