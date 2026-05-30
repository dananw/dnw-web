import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CssMinifier from "@/components/tools/css-minifier/CssMinifier";
import { getTool } from "@/data/tools";

const tool = getTool("css-minifier")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CssMinifierPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CssMinifier />
    </ToolPageShell>
  );
}
