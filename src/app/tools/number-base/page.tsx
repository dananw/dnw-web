import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NumberBase from "@/components/tools/number-base/NumberBase";
import { getTool } from "@/data/tools";

const tool = getTool("number-base")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function NumberBasePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <NumberBase />
    </ToolPageShell>
  );
}
