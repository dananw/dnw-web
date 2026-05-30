import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UnicodeInspector from "@/components/tools/unicode-inspector/UnicodeInspector";
import { getTool } from "@/data/tools";

const tool = getTool("unicode-inspector")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UnicodeInspectorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UnicodeInspector />
    </ToolPageShell>
  );
}
