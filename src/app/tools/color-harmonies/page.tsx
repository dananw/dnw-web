import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorHarmonies from "@/components/tools/color-harmonies/ColorHarmonies";
import { getTool } from "@/data/tools";

const tool = getTool("color-harmonies")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ColorHarmoniesPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ColorHarmonies />
    </ToolPageShell>
  );
}
