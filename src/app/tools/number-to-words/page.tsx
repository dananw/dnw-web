import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NumberToWords from "@/components/tools/number-to-words/NumberToWords";
import { getTool } from "@/data/tools";

const tool = getTool("number-to-words")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function NumberToWordsPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <NumberToWords />
    </ToolPageShell>
  );
}
