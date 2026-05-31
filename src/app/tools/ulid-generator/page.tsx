import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UlidGenerator from "@/components/tools/ulid-generator/UlidGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("ulid-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UlidGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UlidGenerator />
    </ToolPageShell>
  );
}
