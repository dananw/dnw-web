import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BoxShadowGenerator from "@/components/tools/box-shadow-generator/BoxShadowGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("box-shadow-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function BoxShadowGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <BoxShadowGenerator />
    </ToolPageShell>
  );
}
