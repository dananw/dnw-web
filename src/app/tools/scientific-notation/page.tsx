import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ScientificNotation from "@/components/tools/scientific-notation/ScientificNotation";
import { getTool } from "@/data/tools";

const tool = getTool("scientific-notation")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ScientificNotationPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ScientificNotation />
    </ToolPageShell>
  );
}
