import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import Fibonacci from "@/components/tools/fibonacci/Fibonacci";
import { getTool } from "@/data/tools";

const tool = getTool("fibonacci")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function FibonacciPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <Fibonacci />
    </ToolPageShell>
  );
}
