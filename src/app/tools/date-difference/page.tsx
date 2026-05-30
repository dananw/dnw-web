import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DateDifference from "@/components/tools/date-difference/DateDifference";
import { getTool } from "@/data/tools";

const tool = getTool("date-difference")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function DateDifferencePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <DateDifference />
    </ToolPageShell>
  );
}
