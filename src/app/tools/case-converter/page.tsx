import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CaseConverter from "@/components/tools/case-converter/CaseConverter";
import { getTool } from "@/data/tools";

const tool = getTool("case-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CaseConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CaseConverter />
    </ToolPageShell>
  );
}
