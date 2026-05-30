import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MimeLookup from "@/components/tools/mime-lookup/MimeLookup";
import { getTool } from "@/data/tools";

const tool = getTool("mime-lookup")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function MimeLookupPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <MimeLookup />
    </ToolPageShell>
  );
}
