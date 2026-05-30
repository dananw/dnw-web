import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HtmlToText from "@/components/tools/html-to-text/HtmlToText";
import { getTool } from "@/data/tools";

const tool = getTool("html-to-text")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HtmlToTextPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HtmlToText />
    </ToolPageShell>
  );
}
