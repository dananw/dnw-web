import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TextDiff from "@/components/tools/text-diff/TextDiff";
import { getTool } from "@/data/tools";

const tool = getTool("text-diff")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TextDiffPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TextDiff />
    </ToolPageShell>
  );
}
