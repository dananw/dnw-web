import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import EnvToJson from "@/components/tools/env-to-json/EnvToJson";
import { getTool } from "@/data/tools";

const tool = getTool("env-to-json")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function EnvToJsonPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <EnvToJson />
    </ToolPageShell>
  );
}
