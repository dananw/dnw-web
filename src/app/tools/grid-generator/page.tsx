import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import GridGenerator from "@/components/tools/grid-generator/GridGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("grid-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function GridGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <GridGenerator />
    </ToolPageShell>
  );
}
