import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JwtGenerator from "@/components/tools/jwt-generator/JwtGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("jwt-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JwtGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JwtGenerator />
    </ToolPageShell>
  );
}
