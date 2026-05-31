import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HttpStatusCodes from "@/components/tools/http-status-codes/HttpStatusCodes";
import { getTool } from "@/data/tools";

const tool = getTool("http-status-codes")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function HttpStatusCodesPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <HttpStatusCodes />
    </ToolPageShell>
  );
}
