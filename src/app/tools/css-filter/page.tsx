import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CssFilter from "@/components/tools/css-filter/CssFilter";
import { getTool } from "@/data/tools";

const tool = getTool("css-filter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CssFilterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CssFilter />
    </ToolPageShell>
  );
}
