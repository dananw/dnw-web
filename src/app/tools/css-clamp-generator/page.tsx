import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CssClampGenerator from "@/components/tools/css-clamp-generator/CssClampGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("css-clamp-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CssClampGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CssClampGenerator />
    </ToolPageShell>
  );
}
