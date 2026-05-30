"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { calculateSubnet } from "./subnet";

const IpSubnetCalculator = () => {
  const [input, setInput] = useState("192.168.1.0/24");
  const result = useMemo(() => calculateSubnet(input), [input]);

  const rows = result.info
    ? [
        { label: "Network address", value: result.info.network },
        { label: "Broadcast address", value: result.info.broadcast },
        { label: "Subnet mask", value: result.info.netmask },
        { label: "Wildcard mask", value: result.info.wildcard },
        { label: "First host", value: result.info.firstHost },
        { label: "Last host", value: result.info.lastHost },
        { label: "Usable hosts", value: result.info.usableHosts.toLocaleString("en-US") },
        { label: "Total addresses", value: result.info.totalHosts.toLocaleString("en-US") },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="subnet-input"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          IP address / CIDR
        </label>
        <input
          id="subnet-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="192.168.1.0/24"
          className={`w-full rounded-lg border bg-card px-4 py-3 font-mono text-lg text-foreground outline-none transition-colors focus:border-accent/60 ${
            result.ok ? "border-border" : "border-destructive/70"
          }`}
        />
      </div>

      {!result.ok ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 overflow-hidden rounded-lg border border-border sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {row.label}
              </span>
              <span className="font-mono text-sm text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Enter an IPv4 address with a CIDR prefix (e.g.{" "}
        <code className="text-foreground">10.0.0.0/8</code>). A /31 is treated as
        a point-to-point link (RFC 3021) and /32 as a single host. Runs locally.
      </p>
    </div>
  );
};

export default IpSubnetCalculator;
