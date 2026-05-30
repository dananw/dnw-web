import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LoanCalculator from "@/components/tools/loan-calculator/LoanCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("loan-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function LoanCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <LoanCalculator />
    </ToolPageShell>
  );
}
