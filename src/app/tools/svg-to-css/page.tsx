import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import SvgToCss from "@/components/tools/svg-to-css/SvgToCss";
import { getTool } from "@/data/tools";

const tool = getTool("svg-to-css")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function SvgToCssPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <SvgToCss />
    </ToolPageShell>
  );
}
