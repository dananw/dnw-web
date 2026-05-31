import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BackslashEscape from "@/components/tools/backslash-escape/BackslashEscape";
import { getTool } from "@/data/tools";

const tool = getTool("backslash-escape")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function BackslashEscapePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <BackslashEscape />
    </ToolPageShell>
  );
}
