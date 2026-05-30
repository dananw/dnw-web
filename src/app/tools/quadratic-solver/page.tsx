import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QuadraticSolver from "@/components/tools/quadratic-solver/QuadraticSolver";
import { getTool } from "@/data/tools";

const tool = getTool("quadratic-solver")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function QuadraticSolverPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <QuadraticSolver />
    </ToolPageShell>
  );
}
