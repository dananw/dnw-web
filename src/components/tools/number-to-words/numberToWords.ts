const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
];

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty",
  "ninety",
];

const SCALES = ["", "thousand", "million", "billion", "trillion", "quadrillion"];

/** Words for a number 0-999. */
function chunkToWords(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(`${ONES[Math.floor(n / 100)]} hundred`);
    n %= 100;
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)]);
    n %= 10;
    if (n > 0) parts[parts.length - 1] += `-${ONES[n]}`;
  } else if (n > 0) {
    parts.push(ONES[n]);
  }
  return parts.join(" ");
}

function integerToWords(digits: string): string {
  // Strip leading zeros but keep a single zero.
  const clean = digits.replace(/^0+(?=\d)/, "");
  if (clean === "0") return "zero";

  // Split into 3-digit groups from the right.
  const groups: number[] = [];
  for (let i = clean.length; i > 0; i -= 3) {
    groups.unshift(Number(clean.slice(Math.max(0, i - 3), i)));
  }
  if (groups.length > SCALES.length) return ""; // too large to name

  const words: string[] = [];
  groups.forEach((group, idx) => {
    if (group === 0) return;
    const scale = SCALES[groups.length - 1 - idx];
    words.push(scale ? `${chunkToWords(group)} ${scale}` : chunkToWords(group));
  });
  return words.join(" ");
}

export interface WordsResult {
  ok: boolean;
  value: string;
  error?: string;
}

/** Spell out an integer or decimal number in English words. */
export function numberToWords(input: string): WordsResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { ok: false, value: "", error: "Enter a valid number" };
  }

  const negative = trimmed.startsWith("-");
  const unsigned = trimmed.replace(/^-/, "");
  const [intPart, fracPart] = unsigned.split(".");

  const intWords = integerToWords(intPart);
  if (!intWords) {
    return { ok: false, value: "", error: "Number is too large to spell out" };
  }

  let words = intWords;
  if (fracPart) {
    const digits = fracPart
      .split("")
      .map((d) => ONES[Number(d)])
      .join(" ");
    words += ` point ${digits}`;
  }
  if (negative) words = `negative ${words}`;

  // Capitalize the first letter.
  return { ok: true, value: words.charAt(0).toUpperCase() + words.slice(1) };
}
