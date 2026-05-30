import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ContrastChecker from "@/components/tools/contrast-checker/ContrastChecker";
import { getTool } from "@/data/tools";

const tool = getTool("contrast-checker")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ContrastCheckerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ContrastChecker />
    </ToolPageShell>
  );
}
