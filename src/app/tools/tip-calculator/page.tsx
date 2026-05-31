import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TipCalculator from "@/components/tools/tip-calculator/TipCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("tip-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TipCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TipCalculator />
    </ToolPageShell>
  );
}
