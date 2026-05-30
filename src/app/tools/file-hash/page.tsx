import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FileHash from "@/components/tools/file-hash/FileHash";
import { getTool } from "@/data/tools";

const tool = getTool("file-hash")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FileHashPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FileHash />
    </ToolPageShell>
  );
}
