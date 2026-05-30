import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonDiff from "@/components/tools/json-diff/JsonDiff";
import { getTool } from "@/data/tools";

const tool = getTool("json-diff")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonDiffPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonDiff />
    </ToolPageShell>
  );
}
