import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DiceRoller from "@/components/tools/dice-roller/DiceRoller";
import { getTool } from "@/data/tools";

const tool = getTool("dice-roller")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function DiceRollerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <DiceRoller />
    </ToolPageShell>
  );
}
