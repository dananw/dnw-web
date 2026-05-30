import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FindReplace from "@/components/tools/find-replace/FindReplace";
import { getTool } from "@/data/tools";

const tool = getTool("find-replace")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FindReplacePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FindReplace />
    </ToolPageShell>
  );
}
