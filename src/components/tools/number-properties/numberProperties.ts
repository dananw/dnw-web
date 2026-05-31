export interface NumberInfo {
  ok: boolean;
  value: number;
  isPrime: boolean;
  isEven: boolean;
  isPerfectSquare: boolean;
  divisors: number[];
  primeFactors: { prime: number; exponent: number }[];
  error?: string;
}

const MAX = 1_000_000_000; // keep trial division snappy

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function primeFactorize(n: number): { prime: number; exponent: number }[] {
  const factors: { prime: number; exponent: number }[] = [];
  let remaining = n;
  for (let p = 2; p * p <= remaining; p += p === 2 ? 1 : 2) {
    if (remaining % p === 0) {
      let exponent = 0;
      while (remaining % p === 0) {
        remaining /= p;
        exponent++;
      }
      factors.push({ prime: p, exponent });
    }
  }
  if (remaining > 1) factors.push({ prime: remaining, exponent: 1 });
  return factors;
}

function divisorsOf(n: number): number[] {
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i !== n / i) large.push(n / i);
    }
  }
  return [...small, ...large.reverse()];
}

/** Inspect a positive integer's number-theoretic properties. */
export function numberProperties(input: string): NumberInfo {
  const trimmed = input.trim();
  const base: NumberInfo = {
    ok: false,
    value: 0,
    isPrime: false,
    isEven: false,
    isPerfectSquare: false,
    divisors: [],
    primeFactors: [],
  };
  if (!trimmed) return { ...base, ok: true };
  if (!/^\d+$/.test(trimmed)) return { ...base, error: "Enter a positive whole number" };

  const n = Number(trimmed);
  if (n < 1) return { ...base, error: "Enter a number of at least 1" };
  if (n > MAX) return { ...base, error: `Keep it at or below ${MAX.toLocaleString("en-US")}` };

  const root = Math.sqrt(n);
  return {
    ok: true,
    value: n,
    isPrime: isPrime(n),
    isEven: n % 2 === 0,
    isPerfectSquare: Number.isInteger(root),
    divisors: divisorsOf(n),
    primeFactors: n === 1 ? [] : primeFactorize(n),
  };
}
