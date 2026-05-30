# Design System — "Editorial Engineering"

This is the visual language of the site. Follow it for ANY UI work (new pages,
editing sections, adding/editing tools) so everything stays consistent.

## Aesthetic in one line

Warm paper & ink with a single marigold accent. Editorial, calm, typographic.
Serif display headings, clean sans body, monospace for labels/metadata.

## Typography

- Display / headings: `font-display` (Fraunces serif). Use for `h1`/`h2`/hero text.
- Body / UI: default `font-sans` (Manrope). Don't set it explicitly; it's the default.
- Labels, kickers, metadata, code: `font-mono` (JetBrains Mono).
- Section kicker pattern (small uppercase label): use the `kicker` class, and
  `kicker-accent` for the marigold variant.
- Heading sizes: large display headings use tight tracking, e.g.
  `font-display text-4xl tracking-tight md:text-6xl`.

## Color — ALWAYS use semantic tokens, never raw hex/RGB

Use these Tailwind tokens (defined in `tailwind.config.ts`, backed by HSL CSS
variables in `src/app/globals.css`). They adapt to light/dark automatically:

- Surfaces: `bg-background`, `bg-card`, `bg-muted`
- Text: `text-foreground`, `text-muted-foreground`
- Accent (marigold): `bg-accent`, `text-accent`, `border-accent`
- Borders/inputs: `border-border`, `border-input`, `ring-ring`
- Inverted dramatic surface (Contact + Footer): `bg-ink` / `text-ink-foreground`

Opacity modifiers are encouraged: `bg-accent/10`, `border-border/60`,
`text-muted-foreground/50`, etc.

Do NOT hardcode colors like `text-[#fff]`, `bg-black`, `text-white`. The only
sanctioned non-token colors are the green/red diff states already used in
Text Diff (`text-green-600 dark:text-green-500`, `text-destructive`).

### CRITICAL: Tailwind v4 + custom colors

This project uses Tailwind v4 with `@import "tailwindcss"` and a JS config loaded
via `@config "../../tailwind.config.ts"` in `globals.css`.

If you add a NEW color, you MUST:

1. Define the HSL variable in BOTH `:root` and (if it should change) `.dark` in
   `globals.css`. A fixed (non-inverting) color is defined once in `:root` only —
   that's how `--ink` works.
2. Register it under `theme.extend.colors` in `tailwind.config.ts`.
3. Rebuild — utilities like `bg-<name>` are only generated when both steps exist.
   A common bug: the color "does nothing" because step 2 was skipped.

### The `ink` token

`bg-ink` / `text-ink-foreground` is a fixed dark surface that does NOT invert in
dark mode. Use it only for the dramatic full-bleed sections (Contact, Footer).
Don't use `bg-primary` for those — primary inverts and turns light in dark mode.

## Spacing & layout

- Page sections: generous vertical padding, e.g. `py-24 md:py-32` (tool pages
  use `py-28 md:py-32` via `ToolPageShell`).
- Centered container: `container mx-auto px-6`, with a max width
  (`max-w-4xl` / `max-w-5xl`) for readable line length.
- Radius: rely on the `rounded-lg` default (`--radius` is small/editorial). Don't
  introduce large pill radii except intentional badges/toggles.
- Borders are subtle: prefer `border border-border` (often with `/60` opacity).

## Motion

- Use `framer-motion` with the shared easing `[0.22, 1, 0.36, 1]`.
- Entrance pattern: `initial={{ opacity: 0, y: 20 }}` →
  `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`.
- Respect reduced motion — global CSS already handles it; don't fight it.

## Icons

- Use `lucide-react`. Keep stroke sizes small: `h-3.5 w-3.5` to `h-5 w-5`.
- New icons referenced from the tools registry must be added to the explicit
  `iconMap` in `src/components/tools/ToolCard.tsx` (never `import * as Icons`).

## Components to reuse (don't reinvent)

- `Button` (`@/components/ui/button`) with variants `default | outline |
secondary | ghost | link` and sizes `sm | default | lg | icon`.
- `Card`, `Badge`, `Dialog`, etc. in `src/components/ui/`.
- `SectionHeading` for landing-page sections (kicker + index + title).
- `cn()` from `@/lib/utils` for conditional class merging.

## After ANY change

Run a production build and fix issues before considering the work done:

```
npm run build
```

Type-check is part of the build. Keep diagnostics clean (no TS errors/warnings).
