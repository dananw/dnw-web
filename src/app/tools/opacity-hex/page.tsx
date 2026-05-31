import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import OpacityHex from "@/components/tools/opacity-hex/OpacityHex";
import { getTool } from "@/data/tools";

const tool = getTool("opacity-hex")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function OpacityHexPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <OpacityHex />
    </ToolPageShell>
  );
}
