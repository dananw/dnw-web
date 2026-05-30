export interface ClampInput {
  minSize: number; // px
  maxSize: number; // px
  minViewport: number; // px
  maxViewport: number; // px
  rootFontSize: number; // px, for rem conversion
}

export const DEFAULT_CLAMP: ClampInput = {
  minSize: 16,
  maxSize: 24,
  minViewport: 320,
  maxViewport: 1280,
  rootFontSize: 16,
};

export interface ClampResult {
  ok: boolean;
  value: string;
  error?: string;
}

const round = (n: number) => Math.round(n * 10000) / 10000;

/** Build a fluid CSS clamp() for responsive typography. */
export function buildClamp(input: ClampInput): ClampResult {
  const { minSize, maxSize, minViewport, maxViewport, rootFontSize } = input;
  if (!rootFontSize) return { ok: false, value: "", error: "Root font size can't be zero" };
  if (maxViewport === minViewport) {
    return { ok: false, value: "", error: "Min and max viewport must differ" };
  }

  const minRem = round(minSize / rootFontSize);
  const maxRem = round(maxSize / rootFontSize);

  // Linear interpolation between the two viewport widths.
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const slopeVw = round(slope * 100);
  const interceptPx = minSize - slope * minViewport;
  const interceptRem = round(interceptPx / rootFontSize);

  const lower = Math.min(minRem, maxRem);
  const upper = Math.max(minRem, maxRem);
  const sign = interceptRem >= 0 ? "+" : "-";
  const preferred = `${Math.abs(interceptRem)}rem ${sign} ${slopeVw}vw`;

  return {
    ok: true,
    value: `clamp(${lower}rem, ${preferred}, ${upper}rem)`,
  };
}
