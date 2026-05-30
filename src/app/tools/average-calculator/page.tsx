import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import AverageCalculator from "@/components/tools/average-calculator/AverageCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("average-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function AverageCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <AverageCalculator />
    </ToolPageShell>
  );
}
