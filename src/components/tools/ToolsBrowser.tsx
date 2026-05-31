"use client";

import { useMemo, useState } from "react";
import { Search, Star, X } from "lucide-react";
import type { Tool, ToolCategory } from "@/lib/types";
import ToolCard from "./ToolCard";
import { useFavorites } from "./useFavorites";

export interface ToolGroup {
  category: ToolCategory;
  label: string;
  description: string;
  items: Tool[];
}

interface ToolsBrowserProps {
  groups: ToolGroup[];
}

const ToolsBrowser = ({ groups }: ToolsBrowserProps) => {
  const [query, setQuery] = useState("");
  const { isFavorite, toggle, favorites } = useFavorites();

  const allTools = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const labelByCategory = useMemo(() => {
    const map = {} as Record<ToolCategory, string>;
    for (const g of groups) map[g.category] = g.label;
    return map;
  }, [groups]);

  const q = query.trim().toLowerCase();

  // Favorited tools (alphabetical).
  const favoriteTools = useMemo(
    () =>
      allTools
        .filter((t) => favorites.includes(t.slug))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [allTools, favorites]
  );

  const searchResults = useMemo(() => {
    if (!q) return [];
    return [...allTools]
      .filter((tool) => {
        const haystack = [
          tool.title,
          tool.tagline,
          tool.description,
          labelByCategory[tool.category] ?? tool.category,
          ...tool.tags,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [q, allTools, labelByCategory]);

  const renderCard = (tool: Tool, index: number) => (
    <ToolCard
      key={tool.slug}
      tool={tool}
      index={index}
      isFavorite={isFavorite(tool.slug)}
      onToggleFavorite={toggle}
    />
  );

  return (
    <div className="mt-12">
      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools by name, tag or category…"
          aria-label="Search tools"
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-10 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {q ? (
        /* ---- Search results (flat, alphabetical) ---- */
        <div className="mt-12">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              Results
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {searchResults.length}
            </span>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((tool, i) => renderCard(tool, i))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No tools match “{query}”. Try a different term.
            </p>
          )}
        </div>
      ) : (
        <>
          {/* ---- Favorites ---- */}
          {favoriteTools.length > 0 && (
            <div className="mt-12">
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h2 className="flex items-center gap-2 font-display text-2xl tracking-tight text-foreground">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  Favorites
                </h2>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {favoriteTools.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteTools.map((tool, i) => renderCard(tool, i))}
              </div>
            </div>
          )}

          {/* ---- Categories ---- */}
          <div className="mt-16 space-y-16">
            {groups.map((group) => (
              <div key={group.category}>
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <h2 className="font-display text-2xl tracking-tight text-foreground">
                    {group.label}
                  </h2>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {group.items.length}
                  </span>
                </div>
                <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
                  {group.description}
                </p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((tool, i) => renderCard(tool, i))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ToolsBrowser;
