import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CompoundInterest from "@/components/tools/compound-interest/CompoundInterest";
import { getTool } from "@/data/tools";

const tool = getTool("compound-interest")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CompoundInterestPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CompoundInterest />
    </ToolPageShell>
  );
}
