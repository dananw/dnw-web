import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DiscountCalculator from "@/components/tools/discount-calculator/DiscountCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("discount-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function DiscountCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <DiscountCalculator />
    </ToolPageShell>
  );
}
