import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Base64Hex from "@/components/tools/base64-hex/Base64Hex";
import { getTool } from "@/data/tools";

const tool = getTool("base64-hex")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function Base64HexPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Base64Hex />
    </ToolPageShell>
  );
}
