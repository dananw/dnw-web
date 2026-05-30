"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Star,
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
  FileJson,
  Hexagon,
  MonitorSmartphone,
  Minimize2,
  CreditCard,
  FileText,
  Megaphone,
  BarChart3,
  FlipHorizontal2,
  CaseSensitive,
  Repeat,
  Spline,
  Triangle,
  Shell,
  Scaling,
  Scale,
  HeartPulse,
  Dice5,
  Sigma,
  Cake,
  FileKey2,
  Slash,
  FileSpreadsheet,
  FileCog,
  Heading,
  Shuffle,
  Gamepad2,
  Speech,
  Droplet,
  Sparkles,
  GlassWater,
  Layers,
  Aperture,
  Divide,
  Superscript,
  TrendingUp,
  Receipt,
  Banknote,
  FlaskConical,
  Coins,
  BadgePercent,
  ListChecks,
  FunctionSquare,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  FileJson,
  Hexagon,
  MonitorSmartphone,
  Minimize2,
  CreditCard,
  FileText,
  Megaphone,
  BarChart3,
  FlipHorizontal2,
  CaseSensitive,
  Repeat,
  Spline,
  Triangle,
  Shell,
  Scaling,
  Scale,
  HeartPulse,
  Dice5,
  Sigma,
  Cake,
  FileKey2,
  Slash,
  FileSpreadsheet,
  FileCog,
  Heading,
  Shuffle,
  Gamepad2,
  Speech,
  Droplet,
  Sparkles,
  GlassWater,
  Layers,
  Aperture,
  Divide,
  Superscript,
  TrendingUp,
  Receipt,
  Banknote,
  FlaskConical,
  Coins,
  BadgePercent,
  ListChecks,
  FunctionSquare,
  Gauge,
  Wrench,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench;
}

interface ToolCardProps {
  tool: Tool;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
}

const ToolCard = ({ tool, index, isFavorite, onToggleFavorite }: ToolCardProps) => {
  const Icon = resolveIcon(tool.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease, delay: Math.min(index, 11) * 0.05 }}
      className="group relative h-full"
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/60"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="mt-5 pr-8 font-display text-xl tracking-tight text-foreground">
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

      {/* Overlay controls — siblings of the link so clicks don't navigate. */}
      <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5">
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100" />
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(tool.slug);
            }}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remove ${tool.title} from favorites`
                : `Add ${tool.title} to favorites`
            }
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
          >
            <Star
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite && "fill-accent text-accent"
              )}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ToolCard;
