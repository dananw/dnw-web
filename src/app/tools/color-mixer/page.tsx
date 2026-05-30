import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorMixer from "@/components/tools/color-mixer/ColorMixer";
import { getTool } from "@/data/tools";

const tool = getTool("color-mixer")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ColorMixerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ColorMixer />
    </ToolPageShell>
  );
}
