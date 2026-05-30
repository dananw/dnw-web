import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JwtDecoder from "@/components/tools/jwt-decoder/JwtDecoder";
import { getTool } from "@/data/tools";

const tool = getTool("jwt-decoder")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function JwtDecoderPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <JwtDecoder />
    </ToolPageShell>
  );
}
