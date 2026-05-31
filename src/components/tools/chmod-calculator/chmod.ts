export interface Triad {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface Permissions {
  owner: Triad;
  group: Triad;
  other: Triad;
}

export type Scope = keyof Permissions;
export const SCOPES: Scope[] = ["owner", "group", "other"];

const EMPTY: Triad = { read: false, write: false, execute: false };

export function emptyPermissions(): Permissions {
  return { owner: { ...EMPTY }, group: { ...EMPTY }, other: { ...EMPTY } };
}

/** Single octal digit (0-7) for one triad. */
function triadToDigit(t: Triad): number {
  return (t.read ? 4 : 0) + (t.write ? 2 : 0) + (t.execute ? 1 : 0);
}

function digitToTriad(d: number): Triad {
  return {
    read: (d & 4) !== 0,
    write: (d & 2) !== 0,
    execute: (d & 1) !== 0,
  };
}

/** "755" style octal string. */
export function toOctal(p: Permissions): string {
  return `${triadToDigit(p.owner)}${triadToDigit(p.group)}${triadToDigit(
    p.other
  )}`;
}

function triadToSymbol(t: Triad): string {
  return `${t.read ? "r" : "-"}${t.write ? "w" : "-"}${t.execute ? "x" : "-"}`;
}

/** "rwxr-xr-x" style symbolic notation. */
export function toSymbolic(p: Permissions): string {
  return `${triadToSymbol(p.owner)}${triadToSymbol(p.group)}${triadToSymbol(
    p.other
  )}`;
}

export interface ParseOctalResult {
  ok: boolean;
  permissions: Permissions;
}

/** Parse a 3-digit octal string (e.g. "644") into permissions. */
export function fromOctal(input: string): ParseOctalResult {
  const trimmed = input.trim();
  if (!/^[0-7]{3}$/.test(trimmed)) {
    return { ok: false, permissions: emptyPermissions() };
  }
  const [o, g, t] = trimmed.split("").map((c) => parseInt(c, 10));
  return {
    ok: true,
    permissions: {
      owner: digitToTriad(o),
      group: digitToTriad(g),
      other: digitToTriad(t),
    },
  };
}
