"use client";

import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Level = "L" | "M" | "Q" | "H";

const QrCode = () => {
  const [value, setValue] = useState("https://dananwijaya.com");
  const [size, setSize] = useState(220);
  const [level, setLevel] = useState<Level>("M");
  const wrapRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const svg = wrapRef.current?.querySelector("svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="qr-input" className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Text or URL
        </label>
        <textarea
          id="qr-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="h-24 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex flex-1 items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Size
          <input
            type="range"
            min={120}
            max={400}
            step={20}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          <span className="w-12 text-right text-foreground">{size}px</span>
        </label>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Correction
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="rounded-md border border-border bg-card px-2 py-1 font-mono text-sm text-foreground outline-none focus:border-accent/60"
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </label>
      </div>

      {value.trim() && (
        <div className="flex flex-col items-center gap-4">
          <div ref={wrapRef} className="rounded-lg border border-border bg-white p-5">
            <QRCodeSVG value={value} size={size} level={level} marginSize={2} />
          </div>
          <Button onClick={download} variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> Download SVG
          </Button>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Generated in your browser and exported as clean, scalable SVG. Higher
        error correction survives more damage but packs in more modules.
      </p>
    </div>
  );
};

export default QrCode;
