import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RegexTester from "@/components/tools/regex-tester/RegexTester";
import { getTool } from "@/data/tools";

const tool = getTool("regex-tester")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function RegexTesterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RegexTester />
    </ToolPageShell>
  );
}
