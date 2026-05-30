import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NeumorphismGenerator from "@/components/tools/neumorphism-generator/NeumorphismGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("neumorphism-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function NeumorphismGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <NeumorphismGenerator />
    </ToolPageShell>
  );
}
