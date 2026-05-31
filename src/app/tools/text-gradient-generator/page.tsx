import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TextGradientGenerator from "@/components/tools/text-gradient-generator/TextGradientGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("text-gradient-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TextGradientGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TextGradientGenerator />
    </ToolPageShell>
  );
}
