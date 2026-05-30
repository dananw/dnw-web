import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NatoPhonetic from "@/components/tools/nato-phonetic/NatoPhonetic";
import { getTool } from "@/data/tools";

const tool = getTool("nato-phonetic")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function NatoPhoneticPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <NatoPhonetic />
    </ToolPageShell>
  );
}
