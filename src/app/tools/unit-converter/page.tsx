import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UnitConverter from "@/components/tools/unit-converter/UnitConverter";
import { getTool } from "@/data/tools";

const tool = getTool("unit-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UnitConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UnitConverter />
    </ToolPageShell>
  );
}
