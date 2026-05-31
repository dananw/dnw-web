export type Category = "length" | "weight" | "temperature";

export const CATEGORIES: Category[] = ["length", "weight", "temperature"];

/** Factor of each unit relative to the category's base unit. */
const FACTORS: Record<Exclude<Category, "temperature">, Record<string, number>> = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    t: 1_000_000,
    oz: 28.349523125,
    lb: 453.59237,
  },
};

const TEMP_UNITS = ["C", "F", "K"] as const;

export function unitsFor(category: Category): string[] {
  if (category === "temperature") return [...TEMP_UNITS];
  return Object.keys(FACTORS[category]);
}

function toCelsius(value: number, unit: string): number {
  if (unit === "F") return (value - 32) * (5 / 9);
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(c: number, unit: string): number {
  if (unit === "F") return c * (9 / 5) + 32;
  if (unit === "K") return c + 273.15;
  return c;
}

function tidy(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Number(n.toFixed(6)).toString();
}

export interface ConversionRow {
  unit: string;
  value: string;
}

/** Convert a value into every other unit of its category. */
export function convertAll(category: Category, value: number, from: string): ConversionRow[] {
  if (!Number.isFinite(value)) return [];
  if (category === "temperature") {
    const c = toCelsius(value, from);
    return unitsFor(category).map((unit) => ({ unit, value: tidy(fromCelsius(c, unit)) }));
  }
  const factors = FACTORS[category];
  const base = value * factors[from];
  return unitsFor(category).map((unit) => ({ unit, value: tidy(base / factors[unit]) }));
}
