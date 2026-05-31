export interface GcdLcmResult {
  ok: boolean;
  numbers: number[];
  gcd: number;
  lcm: number;
  error?: string;
}

function gcd2(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm2(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcd2(a, b)) * b);
}

/** Parse a list of integers and compute their GCD and LCM. */
export function computeGcdLcm(input: string): GcdLcmResult {
  const tokens = input.split(/[\s,]+/).filter(Boolean);
  if (tokens.length < 2) {
    return { ok: false, numbers: [], gcd: 0, lcm: 0, error: "Enter at least two integers" };
  }
  const numbers: number[] = [];
  for (const t of tokens) {
    if (!/^-?\d+$/.test(t)) {
      return { ok: false, numbers: [], gcd: 0, lcm: 0, error: `Not an integer: "${t}"` };
    }
    numbers.push(Number(t));
  }

  const gcd = numbers.reduce((a, b) => gcd2(a, b));
  const lcm = numbers.reduce((a, b) => lcm2(a, b));
  return { ok: true, numbers, gcd, lcm };
}
