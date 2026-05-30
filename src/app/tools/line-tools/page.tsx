import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LineTools from "@/components/tools/line-tools/LineTools";
import { getTool } from "@/data/tools";

const tool = getTool("line-tools")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function LineToolsPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <LineTools />
    </ToolPageShell>
  );
}
