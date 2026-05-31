import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CharacterFrequency from "@/components/tools/character-frequency/CharacterFrequency";
import { getTool } from "@/data/tools";

const tool = getTool("character-frequency")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CharacterFrequencyPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CharacterFrequency />
    </ToolPageShell>
  );
}
