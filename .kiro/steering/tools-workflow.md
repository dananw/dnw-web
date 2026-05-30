---
inclusion: fileMatch
fileMatchPattern: "src/**/tools/**"
---

# Tools — How to add, edit, and keep them consistent

This guide covers the `/tools` mini-utilities. Read the always-on
`design-system.md` for visual rules; this file is about structure and workflow.

## Architecture (one source of truth)

- Registry: `src/data/tools.ts` — the `tools[]` array drives the `/tools` index.
- Type: `Tool` in `src/lib/types.ts` (`slug`, `title`, `description`, `tagline`,
  `category`, `tags`, `icon`, `published`).
- Index page: `src/app/tools/page.tsx` — auto-grouped by category, generated
  from the registry. You normally DON'T touch it when adding a tool.
- Per-tool route: `src/app/tools/<slug>/page.tsx` (server component, exports
  `metadata`).
- Per-tool UI: `src/components/tools/<slug>/` — a `"use client"` component plus a
  pure logic file (`.ts`) kept separate so the logic is testable.
- Shared chrome: `ToolPageShell` (back link + title + description) wraps every
  tool page. `ToolCard` renders the index cards.

## Hard rules

1. Every tool MUST run 100% client-side. No network calls, no sending user data
   anywhere. The index copy promises "no tracking, runs in your browser" — keep
   that true.
2. Keep pure logic in a separate `.ts` file from the React component. Components
   are presentation; logic is testable in isolation.
3. Prefer the browser's built-in APIs over new dependencies (Web Crypto, URL,
   TextEncoder, structuredClone, Intl, etc.). Only add a dependency when the
   task genuinely needs it — and if you do, pin the version and prefer one
   already present in the tree.

## Add a new tool (checklist)

1. Add an entry to `tools[]` in `src/data/tools.ts`. Pick a `category`
   (`dev | format | text | misc`) and a real `lucide-react` icon name.
2. Register that icon in the `iconMap` inside
   `src/components/tools/ToolCard.tsx` (explicit import — never `import *`).
   Verify the name exists: it must be an exported lucide component.
3. Create the logic file `src/components/tools/<slug>/<name>.ts` with pure,
   exported functions. Handle empty input and invalid input gracefully
   (return a typed result like `{ ok: boolean; ... }` instead of throwing).
4. Create the client component `src/components/tools/<slug>/<Name>.tsx`
   (`"use client"`). Follow the established layout conventions below.
5. Create the route `src/app/tools/<slug>/page.tsx`:
   - `const tool = getTool("<slug>")!;`
   - export `metadata` using `tool.title` / `tool.description`
   - render `<ToolPageShell title={tool.title} description={tool.description}>`
     wrapping the component.
6. Test the logic, then `npm run build`. Fix all errors/diagnostics.

## Layout conventions (match the existing tools)

- Wrap content in a `space-y-4` / `space-y-5` / `space-y-6` stack.
- Input/output side-by-side: `grid grid-cols-1 gap-4 lg:grid-cols-2`.
- Field labels: `font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground`.
- Textareas: `rounded-lg border border-border bg-card p-4 font-mono text-sm
leading-relaxed text-foreground outline-none transition-colors
focus:border-accent/60`. Read-only output uses `bg-muted/40`.
- IMPORTANT alignment: if one column's label row has a button (e.g. Copy) and the
  other doesn't, give BOTH label rows a fixed height `flex h-7 items-center
justify-between` so the inputs below line up. (This was a real bug.)
- Mode toggles (encode/decode etc.): segmented control —
  `inline-flex rounded-lg border border-border p-1` with the active item
  `bg-accent text-accent-foreground` and inactive `text-muted-foreground`.
- Copy button: `Button` `size="sm" variant="outline"`, swap icon to `Check`
  ("Copied") for ~1.5s after copying. Guard `navigator.clipboard` in try/catch.
- Error state: red panel — `rounded-lg border border-destructive/40
bg-destructive/10 p-3 text-sm text-destructive` with an `AlertCircle` icon.
  Also set the related input border to `border-destructive/70`.
- End each tool with a short muted explainer paragraph (`text-sm
text-muted-foreground`) describing behavior and reaffirming it runs locally.

## Testing logic before build

Logic files are plain TS and can be run with Node's type stripping. Write a
temporary `tmp_*.mjs` at the project root that imports from
`./src/components/tools/<slug>/<name>.ts`, assert known-answer cases, run:

```
node --experimental-strip-types tmp_<name>.mjs
```

Then DELETE the temp file. Don't commit temp tests. (This workflow has caught
real bugs — e.g. bold/italic collisions and JSON unescape corruption.)

## Categories

`dev | format | text | misc`. Render order + labels + descriptions live in
`tools.ts` (`toolCategoryOrder`, `toolCategoryLabels`,
`toolCategoryDescriptions`). Adding a brand-new category means updating the
`ToolCategory` union in `types.ts` and all three of those maps. Empty categories
are hidden automatically.

## Don't

- Don't add server routes/APIs for tools.
- Don't hardcode colors (see design-system.md).
- Don't duplicate `ToolPageShell` chrome inside a tool — let the shell do it.
- Don't edit the index page just to list a new tool; the registry handles it.
