export interface ComboResult {
  ok: boolean;
  permutations: string;
  combinations: string;
  error?: string;
}

function factorial(n: bigint): bigint {
  let result = 1n;
  for (let i = 2n; i <= n; i++) result *= i;
  return result;
}

/** Compute nPr and nCr exactly with big integers. */
export function combinatorics(nInput: string, rInput: string): ComboResult {
  if (!nInput.trim() || !rInput.trim()) {
    return { ok: true, permutations: "", combinations: "" };
  }
  if (!/^\d+$/.test(nInput.trim()) || !/^\d+$/.test(rInput.trim())) {
    return { ok: false, permutations: "", combinations: "", error: "Enter whole numbers" };
  }
  const n = BigInt(nInput.trim());
  const r = BigInt(rInput.trim());
  if (r > n) {
    return { ok: false, permutations: "", combinations: "", error: "r must not exceed n" };
  }
  if (n > 2000n) {
    return { ok: false, permutations: "", combinations: "", error: "Keep n at or below 2000" };
  }

  // nPr = n! / (n-r)! ; nCr = nPr / r!
  let perm = 1n;
  for (let i = n - r + 1n; i <= n; i++) perm *= i;
  const comb = perm / factorial(r);

  return { ok: true, permutations: perm.toString(), combinations: comb.toString() };
}
