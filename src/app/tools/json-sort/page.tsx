import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonSort from "@/components/tools/json-sort/JsonSort";
import { getTool } from "@/data/tools";

const tool = getTool("json-sort")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonSortPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonSort />
    </ToolPageShell>
  );
}
