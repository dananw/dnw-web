import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Rot47 from "@/components/tools/rot47/Rot47";
import { getTool } from "@/data/tools";

const tool = getTool("rot47")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function Rot47Page() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Rot47 />
    </ToolPageShell>
  );
}
