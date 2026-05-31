import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FancyText from "@/components/tools/fancy-text/FancyText";
import { getTool } from "@/data/tools";

const tool = getTool("fancy-text")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FancyTextPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FancyText />
    </ToolPageShell>
  );
}
