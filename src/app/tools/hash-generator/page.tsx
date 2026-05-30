import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HashGenerator from "@/components/tools/hash-generator/HashGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("hash-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HashGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HashGenerator />
    </ToolPageShell>
  );
}
