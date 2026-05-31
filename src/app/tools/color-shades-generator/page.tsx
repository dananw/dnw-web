import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorShadesGenerator from "@/components/tools/color-shades-generator/ColorShadesGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("color-shades-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ColorShadesGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ColorShadesGenerator />
    </ToolPageShell>
  );
}
