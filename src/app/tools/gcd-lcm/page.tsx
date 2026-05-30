import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import GcdLcm from "@/components/tools/gcd-lcm/GcdLcm";
import { getTool } from "@/data/tools";

const tool = getTool("gcd-lcm")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function GcdLcmPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <GcdLcm />
    </ToolPageShell>
  );
}
