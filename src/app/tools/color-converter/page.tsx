import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorConverter from "@/components/tools/color-converter/ColorConverter";
import { getTool } from "@/data/tools";

const tool = getTool("color-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ColorConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ColorConverter />
    </ToolPageShell>
  );
}
