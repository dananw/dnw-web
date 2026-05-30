import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BorderRadiusGenerator from "@/components/tools/border-radius-generator/BorderRadiusGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("border-radius-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function BorderRadiusGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <BorderRadiusGenerator />
    </ToolPageShell>
  );
}
