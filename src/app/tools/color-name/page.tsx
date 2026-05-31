import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorName from "@/components/tools/color-name/ColorName";
import { getTool } from "@/data/tools";

const tool = getTool("color-name")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ColorNamePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ColorName />
    </ToolPageShell>
  );
}
