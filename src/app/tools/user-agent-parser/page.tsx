import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UserAgentParser from "@/components/tools/user-agent-parser/UserAgentParser";
import { getTool } from "@/data/tools";

const tool = getTool("user-agent-parser")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UserAgentParserPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UserAgentParser />
    </ToolPageShell>
  );
}
