"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchMime } from "./mime";

const MimeLookup = () => {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchMime(query), [query]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by extension or MIME type…"
          aria-label="Search MIME types"
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
        />
      </div>

      {results.length > 0 ? (
        <div className="divide-y divide-border/60 rounded-lg border border-border">
          {results.map((m) => (
            <div key={m.ext} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <span className="font-mono text-sm text-accent">.{m.ext}</span>
              <span className="break-all text-right font-mono text-sm text-foreground">{m.mime}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No matches for “{query}”.</p>
      )}

      <p className="text-sm text-muted-foreground">
        A built-in reference of common file extensions and their MIME (content)
        types. Everything is bundled with the page.
      </p>
    </div>
  );
};

export default MimeLookup;
