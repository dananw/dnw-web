import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Base64Tool from "@/components/tools/base64/Base64Tool";
import { getTool } from "@/data/tools";

const tool = getTool("base64")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function Base64Page() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Base64Tool />
    </ToolPageShell>
  );
}
