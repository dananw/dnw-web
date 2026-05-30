"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageSquare,
  Wrench,
  Code2,
  Type,
  Braces,
  KeyRound,
  Link2,
  Binary,
  Hash,
  Fingerprint,
  Clock,
  FileCode2,
  ArrowRightLeft,
  GitCompare,
  Regex,
  CalendarClock,
  CodeXml,
  Quote,
  Calculator,
  Table,
  Eye,
  WholeWord,
  Pilcrow,
  Tag,
  Rows3,
  Palette,
  Contrast,
  Lock,
  HardDrive,
  Globe,
  FileLock2,
  Barcode,
  Box,
  Blend,
  Ruler,
  RectangleHorizontal,
  Table2,
  ListTree,
  FileDigit,
  ShieldCheck,
  Network,
  Router,
  ArrowDownAZ,
  KeySquare,
  Dices,
  RotateCw,
  Radio,
  Replace,
  Eraser,
  Frame,
  Baseline,
  Paintbrush,
  FileImage,
  Landmark,
  Percent,
  CalendarDays,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { Tool } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Explicit icon map. Add the icons you reference in data/tools.ts here.
 * Done this way (instead of `import * as Icons`) so the bundle only ships the
 * icons actually used, keeping the page lean as the tool list grows.
 */
const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Code2,
  Type,
  Braces,
  KeyRound,
  Link2,
  Binary,
  Hash,
  Fingerprint,
  Clock,
  FileCode2,
  ArrowRightLeft,
  GitCompare,
  Regex,
  CalendarClock,
  CodeXml,
  Quote,
  Calculator,
  Table,
  Eye,
  WholeWord,
  Pilcrow,
  Tag,
  Rows3,
  Palette,
  Contrast,
  Lock,
  HardDrive,
  Globe,
  FileLock2,
  Barcode,
  Box,
  Blend,
  Ruler,
  RectangleHorizontal,
  Table2,
  ListTree,
  FileDigit,
  ShieldCheck,
  Network,
  Router,
  ArrowDownAZ,
  KeySquare,
  Dices,
  RotateCw,
  Radio,
  Replace,
  Eraser,
  Frame,
  Baseline,
  Paintbrush,
  FileImage,
  Landmark,
  Percent,
  CalendarDays,
  Languages,
  Wrench,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench;
}

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const Icon = resolveIcon(tool.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/60"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <h3 className="mt-5 font-display text-xl tracking-tight text-foreground">
          {tool.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {tool.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
