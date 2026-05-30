import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FlexboxPlayground from "@/components/tools/flexbox-playground/FlexboxPlayground";
import { getTool } from "@/data/tools";

const tool = getTool("flexbox-playground")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FlexboxPlaygroundPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FlexboxPlayground />
    </ToolPageShell>
  );
}
