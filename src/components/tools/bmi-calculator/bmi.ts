export interface BmiResult {
  ok: boolean;
  bmi: number;
  category: string;
  error?: string;
}

function categorize(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function finish(bmiRaw: number): BmiResult {
  if (!Number.isFinite(bmiRaw) || bmiRaw <= 0) {
    return { ok: false, bmi: 0, category: "", error: "Enter a valid height and weight" };
  }
  const bmi = Math.round(bmiRaw * 10) / 10;
  return { ok: true, bmi, category: categorize(bmi) };
}

/** BMI from metric inputs: weight in kg, height in centimetres. */
export function bmiMetric(weightKg: number, heightCm: number): BmiResult {
  if (!(weightKg > 0) || !(heightCm > 0)) {
    return { ok: false, bmi: 0, category: "", error: "Enter a valid height and weight" };
  }
  const m = heightCm / 100;
  return finish(weightKg / (m * m));
}

/** BMI from imperial inputs: weight in pounds, height in inches. */
export function bmiImperial(weightLb: number, heightIn: number): BmiResult {
  if (!(weightLb > 0) || !(heightIn > 0)) {
    return { ok: false, bmi: 0, category: "", error: "Enter a valid height and weight" };
  }
  return finish((703 * weightLb) / (heightIn * heightIn));
}
