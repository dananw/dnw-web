export interface TimestampViews {
  unixSeconds: number;
  unixMillis: number;
  local: string;
  utc: string;
  iso: string;
  relative: string;
}

/** Human-friendly relative time, e.g. "3 hours ago" / "in 2 days". */
export function relativeTime(date: Date, now: Date = new Date()): string {
  const diffMs = date.getTime() - now.getTime();
  const abs = Math.abs(diffMs);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
    ["second", 1000],
  ];
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  for (const [unit, ms] of units) {
    if (abs >= ms || unit === "second") {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return "now";
}

function build(date: Date): TimestampViews {
  return {
    unixSeconds: Math.floor(date.getTime() / 1000),
    unixMillis: date.getTime(),
    local: date.toLocaleString(),
    utc: date.toUTCString(),
    iso: date.toISOString(),
    relative: relativeTime(date),
  };
}

/**
 * Parse a Unix timestamp. Auto-detects seconds vs milliseconds by magnitude
 * (13+ digits => ms). Returns null if not a finite number.
 */
export function fromUnix(value: string): TimestampViews | null {
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  const ms = trimmed.replace("-", "").length >= 13 ? num : num * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return null;
  return build(date);
}

/** Parse a date string (anything Date can read, incl. ISO). */
export function fromDateString(value: string): TimestampViews | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return null;
  return build(date);
}

export function nowViews(): TimestampViews {
  return build(new Date());
}
