import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TimestampConverter from "@/components/tools/timestamp-converter/TimestampConverter";
import { getTool } from "@/data/tools";

const tool = getTool("timestamp-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TimestampConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TimestampConverter />
    </ToolPageShell>
  );
}
