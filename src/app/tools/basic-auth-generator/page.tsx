import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BasicAuthGenerator from "@/components/tools/basic-auth-generator/BasicAuthGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("basic-auth-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function BasicAuthGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <BasicAuthGenerator />
    </ToolPageShell>
  );
}
