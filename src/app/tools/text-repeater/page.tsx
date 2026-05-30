import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TextRepeater from "@/components/tools/text-repeater/TextRepeater";
import { getTool } from "@/data/tools";

const tool = getTool("text-repeater")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TextRepeaterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TextRepeater />
    </ToolPageShell>
  );
}
