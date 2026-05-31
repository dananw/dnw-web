import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MacAddressGenerator from "@/components/tools/mac-address-generator/MacAddressGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("mac-address-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function MacAddressGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <MacAddressGenerator />
    </ToolPageShell>
  );
}
