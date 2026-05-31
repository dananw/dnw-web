import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonToQuery from "@/components/tools/json-to-query/JsonToQuery";
import { getTool } from "@/data/tools";

const tool = getTool("json-to-query")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonToQueryPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonToQuery />
    </ToolPageShell>
  );
}
