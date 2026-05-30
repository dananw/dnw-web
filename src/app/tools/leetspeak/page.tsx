import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Leetspeak from "@/components/tools/leetspeak/Leetspeak";
import { getTool } from "@/data/tools";

const tool = getTool("leetspeak")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function LeetspeakPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Leetspeak />
    </ToolPageShell>
  );
}
