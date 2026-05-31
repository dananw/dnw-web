import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RemoveAccents from "@/components/tools/remove-accents/RemoveAccents";
import { getTool } from "@/data/tools";

const tool = getTool("remove-accents")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function RemoveAccentsPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RemoveAccents />
    </ToolPageShell>
  );
}
