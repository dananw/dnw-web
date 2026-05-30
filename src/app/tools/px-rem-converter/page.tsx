import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PxRemConverter from "@/components/tools/px-rem-converter/PxRemConverter";
import { getTool } from "@/data/tools";

const tool = getTool("px-rem-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function PxRemConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <PxRemConverter />
    </ToolPageShell>
  );
}
