import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HtmlEntities from "@/components/tools/html-entities/HtmlEntities";
import { getTool } from "@/data/tools";

const tool = getTool("html-entities")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HtmlEntitiesPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HtmlEntities />
    </ToolPageShell>
  );
}
