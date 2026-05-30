import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LuhnValidator from "@/components/tools/luhn-validator/LuhnValidator";
import { getTool } from "@/data/tools";

const tool = getTool("luhn-validator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function LuhnValidatorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <LuhnValidator />
    </ToolPageShell>
  );
}
