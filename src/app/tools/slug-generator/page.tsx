import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import SlugGenerator from "@/components/tools/slug-generator/SlugGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("slug-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function SlugGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <SlugGenerator />
    </ToolPageShell>
  );
}
