import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PigLatin from "@/components/tools/pig-latin/PigLatin";
import { getTool } from "@/data/tools";

const tool = getTool("pig-latin")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function PigLatinPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <PigLatin />
    </ToolPageShell>
  );
}
