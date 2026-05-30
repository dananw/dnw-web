// A compact set of CSS named colors (the common, distinct ones).
const NAMED: Record<string, [number, number, number]> = {
  black: [0, 0, 0], white: [255, 255, 255], red: [255, 0, 0], lime: [0, 255, 0],
  blue: [0, 0, 255], yellow: [255, 255, 0], cyan: [0, 255, 255], magenta: [255, 0, 255],
  silver: [192, 192, 192], gray: [128, 128, 128], maroon: [128, 0, 0], olive: [128, 128, 0],
  green: [0, 128, 0], purple: [128, 0, 128], teal: [0, 128, 128], navy: [0, 0, 128],
  orange: [255, 165, 0], pink: [255, 192, 203], brown: [165, 42, 42], gold: [255, 215, 0],
  coral: [255, 127, 80], salmon: [250, 128, 114], crimson: [220, 20, 60], tomato: [255, 99, 71],
  indigo: [75, 0, 130], violet: [238, 130, 238], orchid: [218, 112, 214], plum: [221, 160, 221],
  khaki: [240, 230, 140], beige: [245, 245, 220], ivory: [255, 255, 240], lavender: [230, 230, 250],
  turquoise: [64, 224, 208], skyblue: [135, 206, 235], steelblue: [70, 130, 180], royalblue: [65, 105, 225],
  dodgerblue: [30, 144, 255], forestgreen: [34, 139, 34], seagreen: [46, 139, 87], olivedrab: [107, 142, 35],
  chocolate: [210, 105, 30], sienna: [160, 82, 45], tan: [210, 180, 140], wheat: [245, 222, 179],
  slategray: [112, 128, 144], dimgray: [105, 105, 105], lightgray: [211, 211, 211], gainsboro: [220, 220, 220],
  firebrick: [178, 34, 34], darkred: [139, 0, 0], darkgreen: [0, 100, 0], darkblue: [0, 0, 139],
  goldenrod: [218, 165, 32], peru: [205, 133, 63], hotpink: [255, 105, 180], deeppink: [255, 20, 147],
  midnightblue: [25, 25, 112], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113],
  cadetblue: [95, 158, 160], darkorange: [255, 140, 0], aquamarine: [127, 255, 212],
};

function parseHex(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function toHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

export interface ColorNameResult {
  ok: boolean;
  name: string;
  hex: string;
  exact: boolean;
  distance: number;
}

/** Find the nearest named CSS color to a HEX value. */
export function nearestColorName(hex: string): ColorNameResult | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  let best = "";
  let bestDist = Infinity;
  let bestRgb: [number, number, number] = [0, 0, 0];
  for (const [name, c] of Object.entries(NAMED)) {
    const d = (rgb[0] - c[0]) ** 2 + (rgb[1] - c[1]) ** 2 + (rgb[2] - c[2]) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = name;
      bestRgb = c;
    }
  }
  return {
    ok: true,
    name: best,
    hex: toHex(bestRgb),
    exact: bestDist === 0,
    distance: Math.round(Math.sqrt(bestDist)),
  };
}
