import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TotpGenerator from "@/components/tools/totp-generator/TotpGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("totp-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function TotpGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <TotpGenerator />
    </ToolPageShell>
  );
}
