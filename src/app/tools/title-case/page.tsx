import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TitleCase from "@/components/tools/title-case/TitleCase";
import { getTool } from "@/data/tools";

const tool = getTool("title-case")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TitleCasePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TitleCase />
    </ToolPageShell>
  );
}
