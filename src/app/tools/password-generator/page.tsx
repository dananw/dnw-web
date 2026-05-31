import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PasswordGenerator from "@/components/tools/password-generator/PasswordGenerator";
import { getTool } from "@/data/tools";

const tool = getTool("password-generator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <PasswordGenerator />
    </ToolPageShell>
  );
}
