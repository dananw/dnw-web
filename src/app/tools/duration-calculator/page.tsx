import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DurationCalculator from "@/components/tools/duration-calculator/DurationCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("duration-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function DurationCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <DurationCalculator />
    </ToolPageShell>
  );
}
