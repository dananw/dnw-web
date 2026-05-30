import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RomanNumeral from "@/components/tools/roman-numeral/RomanNumeral";
import { getTool } from "@/data/tools";

const tool = getTool("roman-numeral")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function RomanNumeralPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RomanNumeral />
    </ToolPageShell>
  );
}
