import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UrlEncoder from "@/components/tools/url-encoder/UrlEncoder";
import { getTool } from "@/data/tools";

const tool = getTool("url-encoder")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function UrlEncoderPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <UrlEncoder />
    </ToolPageShell>
  );
}
