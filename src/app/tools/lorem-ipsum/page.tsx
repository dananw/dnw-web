import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LoremIpsum from "@/components/tools/lorem-ipsum/LoremIpsum";
import { getTool } from "@/data/tools";

const tool = getTool("lorem-ipsum")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function LoremIpsumPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <LoremIpsum />
    </ToolPageShell>
  );
}
