import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RandomNumberGenerator from "@/components/tools/random-number-generator/RandomNumberGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("random-number-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function RandomNumberGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RandomNumberGenerator />
    </ToolPageShell>
  );
}
