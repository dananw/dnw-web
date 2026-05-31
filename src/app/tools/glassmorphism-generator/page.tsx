import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import GlassmorphismGenerator from "@/components/tools/glassmorphism-generator/GlassmorphismGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("glassmorphism-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function GlassmorphismGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <GlassmorphismGenerator />
    </ToolPageShell>
  );
}
