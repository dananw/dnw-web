import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonToXml from "@/components/tools/json-to-xml/JsonToXml";
import { getTool } from "@/data/tools";

const tool = getTool("json-to-xml")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonToXmlPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonToXml />
    </ToolPageShell>
  );
}
