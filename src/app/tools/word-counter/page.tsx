import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WordCounter from "@/components/tools/word-counter/WordCounter";
import { getTool } from "@/data/tools";

const tool = getTool("word-counter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function WordCounterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <WordCounter />
    </ToolPageShell>
  );
}
