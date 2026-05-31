export interface AgeResult {
  ok: boolean;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayInDays: number;
  error?: string;
}

const MS_PER_DAY = 86_400_000;

/** Calculate an exact age from a date of birth relative to `now`. */
export function calculateAge(birthStr: string, now: number = Date.now()): AgeResult {
  const empty = { years: 0, months: 0, days: 0, totalDays: 0, nextBirthdayInDays: 0 };
  if (!birthStr) return { ok: false, ...empty, error: "Pick a date of birth" };

  const birth = new Date(birthStr);
  if (Number.isNaN(birth.getTime())) return { ok: false, ...empty, error: "Invalid date" };

  const today = new Date(now);
  if (birth.getTime() > today.getTime()) {
    return { ok: false, ...empty, error: "Date of birth is in the future" };
  }

  let years = today.getUTCFullYear() - birth.getUTCFullYear();
  let months = today.getUTCMonth() - birth.getUTCMonth();
  let days = today.getUTCDate() - birth.getUTCDate();
  if (days < 0) {
    months -= 1;
    days += new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0)).getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / MS_PER_DAY);

  // Days until the next birthday.
  let next = new Date(Date.UTC(today.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()));
  if (next.getTime() < today.getTime()) {
    next = new Date(Date.UTC(today.getUTCFullYear() + 1, birth.getUTCMonth(), birth.getUTCDate()));
  }
  const nextBirthdayInDays = Math.ceil((next.getTime() - today.getTime()) / MS_PER_DAY);

  return { ok: true, years, months, days, totalDays, nextBirthdayInDays };
}
