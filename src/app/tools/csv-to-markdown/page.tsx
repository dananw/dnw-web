import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CsvToMarkdown from "@/components/tools/csv-to-markdown/CsvToMarkdown";
import { getTool } from "@/data/tools";

const tool = getTool("csv-to-markdown")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CsvToMarkdownPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CsvToMarkdown />
    </ToolPageShell>
  );
}
