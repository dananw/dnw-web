import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RandomPicker from "@/components/tools/random-picker/RandomPicker";
import { getTool } from "@/data/tools";

const tool = getTool("random-picker")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function RandomPickerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RandomPicker />
    </ToolPageShell>
  );
}
