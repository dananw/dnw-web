import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ChmodCalculator from "@/components/tools/chmod-calculator/ChmodCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("chmod-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ChmodCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ChmodCalculator />
    </ToolPageShell>
  );
}
