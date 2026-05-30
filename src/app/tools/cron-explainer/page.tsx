import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CronExplainer from "@/components/tools/cron-explainer/CronExplainer";
import { getTool } from "@/data/tools";

const tool = getTool("cron-explainer")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function CronExplainerPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <CronExplainer />
    </ToolPageShell>
  );
}
