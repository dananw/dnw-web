import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import SqlFormatter from "@/components/tools/sql-formatter/SqlFormatter";
import { getTool } from "@/data/tools";

const tool = getTool("sql-formatter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function SqlFormatterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <SqlFormatter />
    </ToolPageShell>
  );
}
