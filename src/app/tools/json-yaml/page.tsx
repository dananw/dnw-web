import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonYaml from "@/components/tools/json-yaml/JsonYaml";
import { getTool } from "@/data/tools";

const tool = getTool("json-yaml")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonYamlPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonYaml />
    </ToolPageShell>
  );
}
