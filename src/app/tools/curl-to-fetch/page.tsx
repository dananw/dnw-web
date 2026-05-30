import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CurlToFetch from "@/components/tools/curl-to-fetch/CurlToFetch";
import { getTool } from "@/data/tools";

const tool = getTool("curl-to-fetch")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CurlToFetchPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CurlToFetch />
    </ToolPageShell>
  );
}
