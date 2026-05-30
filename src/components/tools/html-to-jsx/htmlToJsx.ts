export interface JsxResult {
  ok: boolean;
  value: string;
}

const ATTR_RENAMES: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  colspan: "colSpan",
  rowspan: "rowSpan",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  enctype: "encType",
  novalidate: "noValidate",
  srcset: "srcSet",
  "accept-charset": "acceptCharset",
};

const VOID_ELEMENTS = [
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
];

function convertStyle(css: string): string {
  const props = css
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((decl) => {
      const idx = decl.indexOf(":");
      if (idx === -1) return null;
      const prop = decl.slice(0, idx).trim().replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
      const value = decl.slice(idx + 1).trim();
      return `${prop}: '${value}'`;
    })
    .filter(Boolean);
  return `style={{ ${props.join(", ")} }}`;
}

/** Convert HTML markup into JSX. */
export function htmlToJsx(html: string): JsxResult {
  if (!html.trim()) return { ok: true, value: "" };
  let out = html;

  // Comments -> JSX expression comments.
  out = out.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c}*/}`);

  // style="..." -> style={{ ... }}
  out = out.replace(/style="([^"]*)"/gi, (_, css) => convertStyle(css));

  // Attribute renames (only in attribute position: name=).
  for (const [from, to] of Object.entries(ATTR_RENAMES)) {
    out = out.replace(new RegExp(`(\\s)${from}=`, "gi"), `$1${to}=`);
  }

  // Self-close void elements.
  const voidRe = new RegExp(`<(${VOID_ELEMENTS.join("|")})\\b([^>]*?)\\s*/?>`, "gi");
  out = out.replace(voidRe, (_, tag, attrs) => `<${tag}${attrs.replace(/\s+$/, "")} />`);

  return { ok: true, value: out };
}
