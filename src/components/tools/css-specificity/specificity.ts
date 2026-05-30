export interface Specificity {
  a: number; // IDs
  b: number; // classes, attributes, pseudo-classes
  c: number; // elements, pseudo-elements
  value: string; // "a,b,c"
  selector: string;
}

function scoreOne(input: string): Specificity {
  let sel = ` ${input} `;
  // :where() contributes nothing.
  sel = sel.replace(/:where\([^)]*\)/gi, " ");
  // :not()/:is()/:has() contribute via their arguments, not themselves.
  sel = sel.replace(/:(not|is|has|matches)\(/gi, " ( ");

  let a = 0;
  let b = 0;
  let c = 0;

  const take = (re: RegExp) => {
    const m = sel.match(re) ?? [];
    sel = sel.replace(re, " ");
    return m.length;
  };

  a += take(/#[\w-]+/g); // ids
  c += take(/::[\w-]+/g); // pseudo-elements
  b += take(/\[[^\]]*\]/g); // attributes
  b += take(/\.[\w-]+/g); // classes
  b += take(/:[\w-]+/g); // pseudo-classes
  c += (sel.match(/[a-zA-Z][\w-]*/g) ?? []).length; // element names

  return { a, b, c, value: `${a},${b},${c}`, selector: input.trim() };
}

function compare(x: Specificity, y: Specificity): number {
  return x.a - y.a || x.b - y.b || x.c - y.c;
}

/**
 * Calculate specificity. For a comma-separated list, the most specific
 * selector wins (that's how a rule's effective specificity is judged).
 */
export function cssSpecificity(selector: string): Specificity | null {
  const parts = selector.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return null;
  return parts.map(scoreOne).reduce((best, cur) => (compare(cur, best) > 0 ? cur : best));
}
