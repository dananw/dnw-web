import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CsvToJson from "@/components/tools/csv-to-json/CsvToJson";
import { getTool } from "@/data/tools";

const tool = getTool("csv-to-json")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CsvToJsonPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CsvToJson />
    </ToolPageShell>
  );
}
