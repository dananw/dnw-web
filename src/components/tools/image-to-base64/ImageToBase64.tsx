"use client";

import { useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Meta {
  name: string;
  type: string;
  size: number;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const ImageToBase64 = () => {
  const [dataUri, setDataUri] = useState("");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [copied, setCopied] = useState<"uri" | "css" | null>(null);

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDataUri(typeof reader.result === "string" ? reader.result : "");
      setMeta({ name: file.name, type: file.type, size: file.size });
    };
    reader.readAsDataURL(file);
  };

  const copy = async (which: "uri" | "css", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  const cssSnippet = dataUri ? `background-image: url("${dataUri}");` : "";

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
        <span className="text-sm text-foreground">Drop an image or click to choose</span>
        <span className="font-mono text-xs text-muted-foreground">PNG · JPG · GIF · SVG · WebP</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readFile(file);
          }}
        />
      </label>

      {dataUri && (
        <>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUri} alt="Preview" className="h-16 w-16 rounded object-contain" />
            <div className="min-w-0 font-mono text-xs text-muted-foreground">
              <div className="truncate text-foreground">{meta?.name}</div>
              <div>{meta?.type}</div>
              <div>{meta ? formatBytes(meta.size) : ""} → {formatBytes(dataUri.length)} as data URI</div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex h-7 items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Data URI
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => copy("uri", dataUri)}
                className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                {copied === "uri" ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
              </Button>
            </div>
            <textarea
              readOnly
              value={dataUri}
              spellCheck={false}
              className="h-28 w-full resize-y rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground outline-none"
            />
          </div>

          <div>
            <div className="mb-2 flex h-7 items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                CSS
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => copy("css", cssSnippet)}
                className="h-7 gap-1.5 px-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                {copied === "css" ? (<><Check className="h-3 w-3" /> Copied</>) : (<><Copy className="h-3 w-3" /> Copy</>)}
              </Button>
            </div>
            <div className="max-h-24 overflow-auto break-all rounded-lg border border-border bg-card px-4 py-3 font-mono text-xs text-foreground">
              {cssSnippet}
            </div>
          </div>
        </>
      )}

      <p className="text-sm text-muted-foreground">
        Inlining avoids an extra request but inflates size by ~33%. Best for
        small icons. The file never leaves your browser.
      </p>
    </div>
  );
};

export default ImageToBase64;
