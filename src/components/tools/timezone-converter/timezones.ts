export const COMMON_ZONES = [
  "UTC",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Jakarta",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

export interface ZoneTime {
  zone: string;
  formatted: string;
  offset: string;
}

/** Format a moment in a given IANA time zone. */
function formatInZone(date: Date, zone: string): ZoneTime {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    dateStyle: "medium",
    timeStyle: "short",
  });
  const offsetFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "shortOffset",
  });
  const offsetPart =
    offsetFmt.formatToParts(date).find((p) => p.type === "timeZoneName")?.value ?? "";
  return { zone, formatted: fmt.format(date), offset: offsetPart };
}

export interface ConvertResult {
  ok: boolean;
  times: ZoneTime[];
  error?: string;
}

/**
 * Interpret a "YYYY-MM-DDTHH:mm" wall-clock value as being in `sourceZone`,
 * then express that instant in each target zone.
 */
export function convertAcrossZones(
  localValue: string,
  sourceZone: string,
  targetZones: string[]
): ConvertResult {
  if (!localValue) return { ok: true, times: [] };

  // Find the UTC instant whose wall-clock time in sourceZone equals localValue.
  const naive = new Date(localValue);
  if (Number.isNaN(naive.getTime())) {
    return { ok: false, times: [], error: "Invalid date/time" };
  }
  const asUtc = Date.UTC(
    naive.getFullYear(),
    naive.getMonth(),
    naive.getDate(),
    naive.getHours(),
    naive.getMinutes()
  );
  // Offset of the source zone at that approximate instant.
  const srcOffsetName = new Intl.DateTimeFormat("en-US", {
    timeZone: sourceZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(asUtc))
    .find((p) => p.type === "timeZoneName")?.value;
  const match = srcOffsetName?.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
  let offsetMinutes = 0;
  if (match) {
    const sign = match[1] === "-" ? -1 : 1;
    offsetMinutes = sign * (parseInt(match[2], 10) * 60 + parseInt(match[3] ?? "0", 10));
  }
  const instant = new Date(asUtc - offsetMinutes * 60_000);

  return { ok: true, times: targetZones.map((z) => formatInZone(instant, z)) };
}
