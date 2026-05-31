export interface QuadraticResult {
  ok: boolean;
  discriminant: number;
  roots: string[];
  nature: string;
  error?: string;
}

const tidy = (n: number) => Number(n.toFixed(4)).toString();

/** Solve ax² + bx + c = 0, reporting real or complex roots. */
export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    return { ok: false, discriminant: 0, roots: [], nature: "", error: "Enter valid coefficients" };
  }
  if (a === 0) {
    if (b === 0) {
      return { ok: false, discriminant: 0, roots: [], nature: "", error: "a and b can't both be zero" };
    }
    // Linear equation bx + c = 0.
    return { ok: true, discriminant: 0, roots: [tidy(-c / b)], nature: "Linear (one root)" };
  }

  const disc = b * b - 4 * a * c;
  if (disc > 0) {
    const sq = Math.sqrt(disc);
    return {
      ok: true,
      discriminant: disc,
      roots: [tidy((-b + sq) / (2 * a)), tidy((-b - sq) / (2 * a))],
      nature: "Two distinct real roots",
    };
  }
  if (disc === 0) {
    return {
      ok: true,
      discriminant: 0,
      roots: [tidy(-b / (2 * a))],
      nature: "One repeated real root",
    };
  }
  const real = tidy(-b / (2 * a));
  const imag = tidy(Math.sqrt(-disc) / (2 * a));
  return {
    ok: true,
    discriminant: disc,
    roots: [`${real} + ${imag}i`, `${real} − ${imag}i`],
    nature: "Two complex roots",
  };
}
