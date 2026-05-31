export interface SubnetInfo {
  cidr: string;
  netmask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  prefix: number;
}

export interface SubnetResult {
  ok: boolean;
  info?: SubnetInfo;
  error?: string;
}

function ipToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const o = Number(p);
    if (o > 255) return null;
    n = (n << 8) + o;
  }
  return n >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

/** Parse "192.168.1.0/24" and derive the full set of subnet facts. */
export function calculateSubnet(input: string): SubnetResult {
  const m = input.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\s*\/\s*(\d{1,2})$/);
  if (!m) return { ok: false, error: "Use the form 192.168.1.0/24" };

  const ip = ipToInt(m[1]);
  const prefix = Number(m[2]);
  if (ip === null) return { ok: false, error: "Invalid IPv4 address" };
  if (prefix < 0 || prefix > 32) return { ok: false, error: "Prefix must be 0–32" };

  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcard = ~mask >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = 2 ** (32 - prefix);

  let firstHost = network;
  let lastHost = broadcast;
  let usable: number;
  if (prefix <= 30) {
    firstHost = (network + 1) >>> 0;
    lastHost = (broadcast - 1) >>> 0;
    usable = total - 2;
  } else if (prefix === 31) {
    // RFC 3021: both addresses are usable on point-to-point links.
    usable = 2;
  } else {
    // /32 is a single host.
    lastHost = network;
    usable = 1;
  }

  return {
    ok: true,
    info: {
      cidr: `${intToIp(network)}/${prefix}`,
      netmask: intToIp(mask),
      wildcard: intToIp(wildcard),
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      firstHost: intToIp(firstHost),
      lastHost: intToIp(lastHost),
      totalHosts: total,
      usableHosts: usable,
      prefix,
    },
  };
}
