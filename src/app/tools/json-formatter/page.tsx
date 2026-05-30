import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonFormatter from "@/components/tools/json-formatter/JsonFormatter";
import { getTool } from "@/data/tools";

const tool = getTool("json-formatter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonFormatterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonFormatter />
    </ToolPageShell>
  );
}
