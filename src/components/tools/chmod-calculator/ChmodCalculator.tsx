"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SCOPES,
  toOctal,
  toSymbolic,
  fromOctal,
  emptyPermissions,
  type Permissions,
  type Scope,
  type Triad,
} from "./chmod";

const PERMS: { key: keyof Triad; label: string }[] = [
  { key: "read", label: "Read" },
  { key: "write", label: "Write" },
  { key: "execute", label: "Execute" },
];

const SCOPE_LABELS: Record<Scope, string> = {
  owner: "Owner",
  group: "Group",
  other: "Other",
};

const ChmodCalculator = () => {
  const [perms, setPerms] = useState<Permissions>(() => {
    const start = emptyPermissions();
    start.owner = { read: true, write: true, execute: true };
    start.group = { read: true, write: false, execute: true };
    start.other = { read: true, write: false, execute: true };
    return start;
  });
  // Raw text for the octal field so partial edits (e.g. "7", "75") are allowed;
  // it only writes back into `perms` once it parses as a full octal value.
  const [octalText, setOctalText] = useState(() => toOctal(perms));
  const [copied, setCopied] = useState(false);

  const octal = useMemo(() => toOctal(perms), [perms]);
  const symbolic = useMemo(() => toSymbolic(perms), [perms]);
  const command = `chmod ${octal} file`;

  const toggle = (scope: Scope, key: keyof Triad) => {
    const next: Permissions = {
      ...perms,
      [scope]: { ...perms[scope], [key]: !perms[scope][key] },
    };
    setPerms(next);
    setOctalText(toOctal(next));
  };

  const onOctalChange = (v: string) => {
    const cleaned = v.replace(/[^0-7]/g, "").slice(0, 3);
    setOctalText(cleaned);
    const parsed = fromOctal(cleaned);
    if (parsed.ok) setPerms(parsed.permissions);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-4 border-b border-border bg-muted/40">
          <span className="px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Who
          </span>
          {PERMS.map((perm) => (
            <span
              key={perm.key}
              className="px-4 py-2.5 text-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
            >
              {perm.label}
            </span>
          ))}
        </div>
        {SCOPES.map((scope) => (
          <div
            key={scope}
            className="grid grid-cols-4 items-center border-b border-border/60 last:border-b-0"
          >
            <span className="px-4 py-3 font-mono text-sm text-foreground">
              {SCOPE_LABELS[scope]}
            </span>
            {PERMS.map((perm) => (
              <div key={perm.key} className="flex justify-center px-4 py-3">
                <input
                  type="checkbox"
                  checked={perms[scope][perm.key]}
                  onChange={() => toggle(scope, perm.key)}
                  aria-label={`${SCOPE_LABELS[scope]} ${perm.label}`}
                  className="h-4 w-4 accent-accent"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="chmod-octal"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Octal
          </label>
          <input
            id="chmod-octal"
            value={octalText}
            onChange={(e) => onOctalChange(e.target.value)}
            inputMode="numeric"
            maxLength={3}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-2xl tracking-[0.3em] text-foreground outline-none transition-colors focus:border-accent/60"
          />
        </div>
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Symbolic
          </span>
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-2xl tracking-[0.2em] text-foreground">
            {symbolic}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex h-7 items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Command
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground">
          {command}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Toggle the permission bits or type an octal value like{" "}
        <code className="text-foreground">644</code> and the others update
        instantly. All calculation happens locally.
      </p>
    </div>
  );
};

export default ChmodCalculator;
