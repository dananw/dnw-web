"use client";

import { useMemo, useState } from "react";
import { parseUserAgent } from "./userAgent";

const UserAgentParser = () => {
  const [input, setInput] = useState(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  const info = useMemo(() => parseUserAgent(input), [input]);

  const rows = [
    { label: "Browser", value: `${info.browser}${info.browserVersion ? ` ${info.browserVersion}` : ""}` },
    { label: "Engine", value: info.engine },
    { label: "Operating system", value: info.os },
    { label: "Device type", value: info.device },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="ua-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          User-Agent string
        </label>
        <textarea
          id="ua-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Paste a User-Agent string…"
          className="h-28 w-full resize-y break-all rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      {input.trim() && (
        <div className="grid grid-cols-1 gap-x-4 overflow-hidden rounded-lg border border-border sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {row.label}
              </span>
              <span className="text-right font-mono text-sm text-foreground">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Parsing is heuristic (User-Agent strings are notoriously inconsistent),
        but covers the common browsers, engines and platforms. Your own UA is
        pre-filled. Runs locally.
      </p>
    </div>
  );
};

export default UserAgentParser;
