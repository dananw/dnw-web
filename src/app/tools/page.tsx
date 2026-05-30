import type { Metadata } from "next";
import ToolCard from "@/components/tools/ToolCard";
import {
  toolsByCategory,
  publishedTools,
  toolCategoryLabels,
  toolCategoryDescriptions,
} from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools — Danan Wijaya",
  description:
    "A small collection of utilities I built for my own workflow. Free to use.",
};

export default function ToolsPage() {
  const groups = toolsByCategory();
  const total = publishedTools().length;

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
          Small utilities I use in my own workflow. No sign-up, no tracking —
          everything runs in your browser.
        </p>

        {total > 0 ? (
          <div className="mt-16 space-y-16">
            {groups.map((group, gi) => {
              // Continuous index so the entrance animation staggers nicely
              // across the whole page, not just within each group.
              const offset = groups
                .slice(0, gi)
                .reduce((sum, g) => sum + g.items.length, 0);
              return (
                <div key={group.category}>
                  <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <h2 className="font-display text-2xl tracking-tight text-foreground">
                      {toolCategoryLabels[group.category]}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {group.items.length}
                    </span>
                  </div>
                  <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
                    {toolCategoryDescriptions[group.category]}
                  </p>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((tool, i) => (
                      <ToolCard key={tool.slug} tool={tool} index={offset + i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-14 text-muted-foreground">
            No tools published yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
