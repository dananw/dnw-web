import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import AsciiConverter from "@/components/tools/ascii-converter/AsciiConverter";
import { getTool } from "@/data/tools";

const tool = getTool("ascii-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function AsciiConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <AsciiConverter />
    </ToolPageShell>
  );
}
