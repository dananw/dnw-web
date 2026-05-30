import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PortLookup from "@/components/tools/port-lookup/PortLookup";
import { getTool } from "@/data/tools";

const tool = getTool("port-lookup")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function PortLookupPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <PortLookup />
    </ToolPageShell>
  );
}
