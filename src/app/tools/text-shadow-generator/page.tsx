import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TextShadowGenerator from "@/components/tools/text-shadow-generator/TextShadowGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("text-shadow-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TextShadowGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TextShadowGenerator />
    </ToolPageShell>
  );
}
