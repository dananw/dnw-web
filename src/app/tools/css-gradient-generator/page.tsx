import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CssGradientGenerator from "@/components/tools/css-gradient-generator/CssGradientGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("css-gradient-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CssGradientGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CssGradientGenerator />
    </ToolPageShell>
  );
}
