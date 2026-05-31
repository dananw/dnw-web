import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import AspectRatioCalculator from "@/components/tools/aspect-ratio-calculator/AspectRatioCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("aspect-ratio-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function AspectRatioCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <AspectRatioCalculator />
    </ToolPageShell>
  );
}
