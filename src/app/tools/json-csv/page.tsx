import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JsonCsv from "@/components/tools/json-csv/JsonCsv";
import { getTool } from "@/data/tools";

const tool = getTool("json-csv")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JsonCsvPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JsonCsv />
    </ToolPageShell>
  );
}
