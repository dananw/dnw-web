export interface CronResult {
  ok: boolean;
  description?: string;
  nextRuns?: string[];
  error?: string;
}

interface FieldSpec {
  name: string;
  min: number;
  max: number;
}

const FIELDS: FieldSpec[] = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "day-of-month", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "day-of-week", min: 0, max: 6 },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Expand a single cron field into the explicit set of allowed values. */
function parseField(field: string, spec: FieldSpec): Set<number> {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    let step = 1;
    let range = part;
    const slash = part.split("/");
    if (slash.length === 2) {
      range = slash[0];
      step = Number(slash[1]);
      if (!Number.isInteger(step) || step < 1)
        throw new Error(`Invalid step in "${part}"`);
    }

    let lo: number;
    let hi: number;
    if (range === "*") {
      lo = spec.min;
      hi = spec.max;
    } else if (range.includes("-")) {
      const [a, b] = range.split("-").map(Number);
      if (!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error(`Invalid range "${range}"`);
      lo = a;
      hi = b;
    } else {
      const n = Number(range);
      if (!Number.isInteger(n)) throw new Error(`Invalid value "${range}"`);
      lo = n;
      hi = n;
    }

    if (lo < spec.min || hi > spec.max || lo > hi) {
      throw new Error(`${spec.name} out of range (${spec.min}-${spec.max})`);
    }
    for (let v = lo; v <= hi; v += step) values.add(v);
  }
  return values;
}

function describeField(
  field: string,
  spec: FieldSpec,
  sets: Set<number>,
): string {
  if (field === "*") return "";
  const arr = [...sets].sort((a, b) => a - b);
  switch (spec.name) {
    case "minute":
      return field.startsWith("*/")
        ? `every ${field.slice(2)} minutes`
        : `at minute ${arr.join(", ")}`;
    case "hour":
      return `past hour ${arr.join(", ")}`;
    case "day-of-month":
      return `on day-of-month ${arr.join(", ")}`;
    case "month":
      return `in ${arr.map((m) => MONTHS[m - 1]).join(", ")}`;
    case "day-of-week":
      return `on ${arr.map((d) => DOW[d % 7]).join(", ")}`;
    default:
      return "";
  }
}

function buildDescription(fields: string[], sets: Set<number>[]): string {
  const parts: string[] = [];
  // minute + hour combined when both are specific single values.
  const [min, hr, dom, mon, dow] = fields;

  if (
    min === "0" &&
    hr !== "*" &&
    !hr.includes("/") &&
    !hr.includes(",") &&
    !hr.includes("-")
  ) {
    parts.push(`At ${String(Number(hr)).padStart(2, "0")}:00`);
  } else if (min === "*" && hr === "*") {
    parts.push("Every minute");
  } else {
    const m = describeField(min, FIELDS[0], sets[0]);
    if (m) parts.push(m.charAt(0).toUpperCase() + m.slice(1));
    const h = describeField(hr, FIELDS[1], sets[1]);
    if (h) parts.push(h);
  }

  const d = describeField(dom, FIELDS[2], sets[2]);
  if (d) parts.push(d);
  const mo = describeField(mon, FIELDS[3], sets[3]);
  if (mo) parts.push(mo);
  const w = describeField(dow, FIELDS[4], sets[4]);
  if (w) parts.push(w);

  return parts.join(", ") + ".";
}

/** Compute the next N run times by scanning forward minute by minute. */
function computeNextRuns(sets: Set<number>[], count: number): string[] {
  const [minutes, hours, doms, months, dows] = sets;
  const runs: string[] = [];
  const cursor = new Date();
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let guard = 0;
  while (runs.length < count && guard < 525600 * 2) {
    guard++;
    if (
      minutes.has(cursor.getMinutes()) &&
      hours.has(cursor.getHours()) &&
      months.has(cursor.getMonth() + 1) &&
      doms.has(cursor.getDate()) &&
      dows.has(cursor.getDay())
    ) {
      runs.push(cursor.toLocaleString());
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return runs;
}

export function explainCron(expr: string): CronResult {
  const trimmed = expr.trim().replace(/\s+/g, " ");
  if (!trimmed) return { ok: false, error: "Enter a cron expression." };

  const fields = trimmed.split(" ");
  if (fields.length !== 5) {
    return {
      ok: false,
      error: `Expected 5 fields (minute hour day month weekday), got ${fields.length}.`,
    };
  }

  try {
    const sets = fields.map((f, i) => parseField(f, FIELDS[i]));
    const description = buildDescription(fields, sets);
    const nextRuns = computeNextRuns(sets, 5);
    return { ok: true, description, nextRuns };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Invalid cron expression",
    };
  }
}
