import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HmacGenerator from "@/components/tools/hmac-generator/HmacGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("hmac-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HmacGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HmacGenerator />
    </ToolPageShell>
  );
}
