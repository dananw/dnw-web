"use client";

import { useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HASH_ALGOS, hashBuffer, formatBytes, type HashAlgo } from "./hash";

interface FileMeta {
  name: string;
  size: number;
}

const FileHash = () => {
  const [meta, setMeta] = useState<FileMeta | null>(null);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const readFile = async (file: File) => {
    setMeta({ name: file.name, size: file.size });
    setHashes({});
    setBusy(true);
    try {
      const buffer = await file.arrayBuffer();
      const entries = await Promise.all(
        HASH_ALGOS.map(async (algo) => [algo, await hashBuffer(buffer, algo as HashAlgo)] as const)
      );
      setHashes(Object.fromEntries(entries));
    } finally {
      setBusy(false);
    }
  };

  const copy = async (algo: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(algo);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) readFile(file);
        }}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center transition-colors hover:border-accent/60"
      >
        <Upload className="h-6 w-6 text-muted-foreground" />
        <span className="text-sm text-foreground">Drop a file or click to choose</span>
        <span className="font-mono text-xs text-muted-foreground">Any file type</span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readFile(file);
          }}
        />
      </label>

      {meta && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-xs">
          <span className="truncate text-foreground">{meta.name}</span>
          <span className="text-muted-foreground">{formatBytes(meta.size)}</span>
        </div>
      )}

      {busy && (
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Hashing…
        </p>
      )}

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {HASH_ALGOS.map((algo) => (
            <div key={algo}>
              <div className="mb-1 flex h-6 items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {algo}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => copy(algo, hashes[algo])}
                  className="h-6 gap-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  {copied === algo ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
                </Button>
              </div>
              <div className="break-all rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs text-foreground">
                {hashes[algo]}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Computes checksums with the Web Crypto API — the file is read locally and
        never uploaded. Great for verifying downloads.
      </p>
    </div>
  );
};

export default FileHash;
