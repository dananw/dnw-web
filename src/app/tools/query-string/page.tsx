import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QueryString from "@/components/tools/query-string/QueryString";
import { getTool } from "@/data/tools";

const tool = getTool("query-string")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function QueryStringPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <QueryString />
    </ToolPageShell>
  );
}
