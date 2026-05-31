export interface DurationResult {
  ok: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  error?: string;
}

/** Measure the duration between two date-time values (order-independent). */
export function duration(startStr: string, endStr: string): DurationResult {
  const empty = {
    days: 0, hours: 0, minutes: 0, seconds: 0,
    totalHours: 0, totalMinutes: 0, totalSeconds: 0,
  };
  if (!startStr || !endStr) return { ok: false, ...empty, error: "Pick both moments" };

  const a = new Date(startStr);
  const b = new Date(endStr);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) {
    return { ok: false, ...empty, error: "Invalid date/time" };
  }

  const ms = Math.abs(b.getTime() - a.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  return {
    ok: true,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}
