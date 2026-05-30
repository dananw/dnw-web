import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import AgeCalculator from "@/components/tools/age-calculator/AgeCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("age-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function AgeCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <AgeCalculator />
    </ToolPageShell>
  );
}
