import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import GoldenRatioCalculator from "@/components/tools/golden-ratio-calculator/GoldenRatioCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("golden-ratio-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function GoldenRatioCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <GoldenRatioCalculator />
    </ToolPageShell>
  );
}
