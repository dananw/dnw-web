import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CaesarCipher from "@/components/tools/caesar-cipher/CaesarCipher";
import { getTool } from "@/data/tools";

const tool = getTool("caesar-cipher")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CaesarCipherPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CaesarCipher />
    </ToolPageShell>
  );
}
