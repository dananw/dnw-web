import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HtmlToJsx from "@/components/tools/html-to-jsx/HtmlToJsx";
import { getTool } from "@/data/tools";

const tool = getTool("html-to-jsx")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HtmlToJsxPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HtmlToJsx />
    </ToolPageShell>
  );
}
