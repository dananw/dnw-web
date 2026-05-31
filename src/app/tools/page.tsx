import type { Metadata } from "next";
import ToolsBrowser, { type ToolGroup } from "@/components/tools/ToolsBrowser";
import {
  toolsByCategory,
  publishedTools,
  toolCategoryLabels,
  toolCategoryDescriptions,
} from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools — Danan Wijaya",
  description:
    "A collection of fast, private developer utilities — all running in your browser. Search and favorite the ones you use most.",
};

export default function ToolsPage() {
  const total = publishedTools().length;
  const groups: ToolGroup[] = toolsByCategory().map((group) => ({
    category: group.category,
    label: toolCategoryLabels[group.category],
    description: toolCategoryDescriptions[group.category],
    items: group.items,
  }));

  return (
    <section className="relative py-28 md:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3">
          <span className="kicker kicker-accent">/</span>
          <span className="h-px w-8 bg-accent/50" />
          <span className="kicker">Tools</span>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
          Things I built for myself
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {total} small utilities I use in my own workflow. No sign-up, no
          tracking — everything runs in your browser. Star the ones you reach for
          most; favorites are saved on this device.
        </p>

        {total > 0 ? (
          <ToolsBrowser groups={groups} />
        ) : (
          <p className="mt-14 text-muted-foreground">
            No tools published yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
