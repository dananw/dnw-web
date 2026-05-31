import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NumberProperties from "@/components/tools/number-properties/NumberProperties";
import { getTool } from "@/data/tools";

const tool = getTool("number-properties")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function NumberPropertiesPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <NumberProperties />
    </ToolPageShell>
  );
}
