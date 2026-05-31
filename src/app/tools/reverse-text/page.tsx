import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ReverseText from "@/components/tools/reverse-text/ReverseText";
import { getTool } from "@/data/tools";

const tool = getTool("reverse-text")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ReverseTextPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ReverseText />
    </ToolPageShell>
  );
}
