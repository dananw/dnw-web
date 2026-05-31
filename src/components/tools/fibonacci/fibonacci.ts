/** Generate the first `count` Fibonacci numbers (starting 0, 1) as strings. */
export function fibonacci(count: number): string[] {
  const n = Math.max(1, Math.min(Math.floor(count) || 1, 1000));
  const out: string[] = [];
  let a = 0n;
  let b = 1n;
  for (let i = 0; i < n; i++) {
    out.push(a.toString());
    [a, b] = [b, a + b];
  }
  return out;
}
