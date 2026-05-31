"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchPorts } from "./ports";

const PortLookup = () => {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPorts(query), [query]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by port, service or keyword…"
          aria-label="Search ports"
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
        />
      </div>

      {results.length > 0 ? (
        <div className="divide-y divide-border/60 rounded-lg border border-border">
          {results.map((p) => (
            <div key={`${p.port}-${p.service}`} className="flex items-baseline gap-4 px-4 py-3">
              <span className="w-16 flex-shrink-0 font-mono text-lg text-accent">{p.port}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-base tracking-tight text-foreground">{p.service}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{p.protocol}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No matches for “{query}”.</p>
      )}

      <p className="text-sm text-muted-foreground">
        Well-known TCP/UDP ports and the services that typically run on them.
        Bundled with the page — no lookups are sent anywhere.
      </p>
    </div>
  );
};

export default PortLookup;
