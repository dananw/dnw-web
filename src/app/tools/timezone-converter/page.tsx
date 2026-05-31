import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TimezoneConverter from "@/components/tools/timezone-converter/TimezoneConverter";
import { getTool } from "@/data/tools";

const tool = getTool("timezone-converter")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TimezoneConverterPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TimezoneConverter />
    </ToolPageShell>
  );
}
