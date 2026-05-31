import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import IpSubnetCalculator from "@/components/tools/ip-subnet-calculator/IpSubnetCalculator";
import { getTool } from "@/data/tools";

const tool = getTool("ip-subnet-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function IpSubnetCalculatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <IpSubnetCalculator />
    </ToolPageShell>
  );
}
