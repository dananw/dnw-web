import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Combinatorics from "@/components/tools/combinatorics/Combinatorics";
import { getTool } from "@/data/tools";

const tool = getTool("combinatorics")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CombinatoricsPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Combinatorics />
    </ToolPageShell>
  );
}
