import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonToTypeScript from "@/components/tools/json-to-typescript/JsonToTypeScript";
import { getTool } from "@/data/tools";

const tool = getTool("json-to-typescript")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonToTypeScriptPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonToTypeScript />
    </ToolPageShell>
  );
}
