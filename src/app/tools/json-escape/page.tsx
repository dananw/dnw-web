import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonEscape from "@/components/tools/json-escape/JsonEscape";
import { getTool } from "@/data/tools";

const tool = getTool("json-escape")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonEscapePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonEscape />
    </ToolPageShell>
  );
}
