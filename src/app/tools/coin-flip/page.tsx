import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CoinFlip from "@/components/tools/coin-flip/CoinFlip";
import { getTool } from "@/data/tools";

const tool = getTool("coin-flip")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CoinFlipPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CoinFlip />
    </ToolPageShell>
  );
}
