import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CssTriangleGenerator from "@/components/tools/css-triangle-generator/CssTriangleGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("css-triangle-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CssTriangleGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CssTriangleGenerator />
    </ToolPageShell>
  );
}
