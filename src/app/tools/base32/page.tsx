import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Base32 from "@/components/tools/base32/Base32";
import { getTool } from "@/data/tools";

const tool = getTool("base32")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function Base32Page() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Base32 />
    </ToolPageShell>
  );
}
