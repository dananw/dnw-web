import type { Metadata } from "next";
import ToolCard from "@/components/tools/ToolCard";
import { publishedTools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools — Danan Wijaya",
  description:
    "A small collection of utilities I built for my own workflow. Free to use.",
};

export default function ToolsPage() {
  const items = publishedTools();

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

        {items.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
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
