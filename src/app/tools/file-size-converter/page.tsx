import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FileSizeConverter from "@/components/tools/file-size-converter/FileSizeConverter";
import { getTool } from "@/data/tools";

const tool = getTool("file-size-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FileSizeConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FileSizeConverter />
    </ToolPageShell>
  );
}
