import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UuidGenerator from "@/components/tools/uuid-generator/UuidGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("uuid-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UuidGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UuidGenerator />
    </ToolPageShell>
  );
}
