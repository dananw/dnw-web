import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CubicBezier from "@/components/tools/cubic-bezier/CubicBezier";
import { getTool } from "@/data/tools";

const tool = getTool("cubic-bezier")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CubicBezierPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CubicBezier />
    </ToolPageShell>
  );
}
