export interface DateDiff {
  ok: boolean;
  /** Calendar breakdown: whole years, months and days between the dates. */
  years: number;
  months: number;
  days: number;
  /** Totals expressed entirely in each unit. */
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  error?: string;
}

const MS_PER_DAY = 86_400_000;

/** Difference between two ISO date strings (YYYY-MM-DD). Order-independent. */
export function dateDifference(startStr: string, endStr: string): DateDiff {
  const empty = {
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
    totalWeeks: 0,
    totalHours: 0,
  };
  if (!startStr || !endStr) return { ok: false, ...empty, error: "Pick both dates" };

  const a = new Date(startStr);
  const b = new Date(endStr);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) {
    return { ok: false, ...empty, error: "Invalid date" };
  }

  const [start, end] = a <= b ? [a, b] : [b, a];

  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  // Calendar-aware years/months/days breakdown.
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  let days = end.getUTCDate() - start.getUTCDate();
  if (days < 0) {
    months -= 1;
    // Days in the month preceding the end date.
    days += new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0)).getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { ok: true, years, months, days, totalDays, totalWeeks, totalHours };
}
