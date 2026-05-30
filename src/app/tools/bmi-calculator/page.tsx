import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BmiCalculator from "@/components/tools/bmi-calculator/BmiCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("bmi-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function BmiCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <BmiCalculator />
    </ToolPageShell>
  );
}
