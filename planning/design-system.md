# Duble//Slash Design System
**Version:** 1.0  
**Date:** 2026-05-05  
**Status:** Source of truth — for Claude Design and all implementation surfaces

---

## 1. Brand Identity

### Product
**Duble//Slash** — a desktop menu-bar app that manages context across AI tools.  
Form factor: Wispr Flow shape. Always running, system-wide. Triggered by `//`.

### Personality
- **Understated confidence.** Never loud. Never startup-cheerful. The tool knows what it's doing.
- **Practitioner-first.** Written for designers and PMs who work across tools, not for engineers who like dashboards.
- **Methodical warmth.** The Fish Model is structured thinking, but the surface stays human and grounded.
- **Quiet premium.** No gradients for decoration. No shadows for drama. Restraint is the signal.

### Voice
- Direct. No fluff. Action > description.
- The `//` operator is a linguistic signature — use it sparingly and deliberately in copy.
- Serif for editorial weight. Sans for instruction and data.

---

## 2. Logo & Wordmark

### Icon mark
- **Shape:** Rounded square, 6px radius
- **Background:** `#0E3A35` (brand-dark, deep forest)
- **Slashes:** Two diagonal strokes — first in `#FFFFFF`, second in `#3DD9B6` (brand-accent, teal)
- **Stroke:** `stroke-linecap: round`, `stroke-width: 14` (18 at small sizes)
- **Live dot:** Amber `#D98A2B`, tucked top-right corner. Breathing animation signals active context.
- **Ring:** Faint stroke ring around dot at large sizes (hidden when ≤ 22px)

### Wordmark
```
[icon] Duble//Slash
```
- `Duble` and `Slash` in Inter 600, `letter-spacing: -0.01em`
- `//` in brand-accent (`#3DD9B6`), `font-weight: 700`, `letter-spacing: -0.04em`
- Icon: 22px × 22px at nav scale

### Icon animation states
- **Drop-in:** scale 0.6 → 1, opacity 0 → 1, spring easing `cubic-bezier(.22,.9,.28,1.2)` 900ms
- **Docked:** shrinks to 22px and moves to menu-bar position, transition 900ms
- **Blink:** live-dot breathes `opacity 1 → 0.55 → 1`, 2.4s ease-in-out infinite
- **Instant:** `transition: none` — for programmatic skip states

---

## 3. Color System

Two surfaces. One palette root.

### 3a. Marketing surface (landing page, pitch, editorial)

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F4ECD7` | Primary background |
| `--cream-soft` | `#FAF4E2` | Card background, code block bg |
| `--cream-edge` | `#E0D5BB` | Borders, dividers |
| `--ink` | `#14140F` | Primary text, headings |
| `--ink-soft` | `#2D2A22` | Body text, list items |
| `--muted` | `#6E6A5A` | Labels, captions, overlines |
| `--forest` | `#1E3B2C` | Hero card bg, blockquote text, accent surfaces |
| `--forest-deep` | `#112318` | Code bg on forest surface |
| `--forest-soft` | `#2A4D3B` | Hover state on forest surfaces |
| `--lilac` | `#DDC9F4` | AI / agent accent, highlights |
| `--lilac-deep` | `#B69EE0` | Code text on forest surface |
| `--sage` | `#8B9A6E` | Secondary nature accent, badges |
| `--terra` | `#C97A5A` | Partial/miss state, warm accent |
| `--brand-dark` | `#0E3A35` | Logo bg, dark CTA |
| `--brand-accent` | `#3DD9B6` | Logo slashes, teal CTA accent |
| `--accent` | `#D98A2B` | Live dot, amber activity signal |

Background pattern: `radial-gradient(circle, rgba(15,17,21,0.07) 1px, transparent 1.2px)` at `22px 22px` — subtle dot grid over cream.

### 3b. App / product surface (dark mode default)

CSS vars are RGB triplets (used with `rgb(var(--token))`).

| Token | Dark value | Light value | Use |
|---|---|---|---|
| `--ds-bg` | `26 26 26` | `245 245 245` | App background |
| `--ds-surface` | `34 34 34` | `255 255 255` | Panel, card bg |
| `--ds-elevated` | `44 44 44` | `237 237 237` | Drawer, dropdown, tooltip |
| `--ds-border` | `56 56 56` | `218 218 218` | Default border |
| `--ds-border-light` | `72 72 72` | `196 196 196` | Subtle dividers |
| `--ds-accent` | `74 222 128` | `22 163 74` | Primary action, active state |
| `--ds-accent-dim` | `22 101 52` | `220 252 231` | Accent background tint |
| `--ds-text` | `245 245 245` | `17 17 17` | Primary text |
| `--ds-text-secondary` | `184 184 184` | `68 68 68` | Secondary labels |
| `--ds-text-dim` | `120 120 120` | `140 140 140` | Tertiary, placeholders |

### 3c. Phase colors (Fish Model — first-class tokens)

These are semantic, not decorative. Every Fish phase owns a color. Use consistently across UI — Kanban columns, card accents, progress indicators, labels.

| Phase | Dark hex | Light hex | Meaning |
|---|---|---|---|
| Explore | `#38BDF8` | `#0284C7` | Open questions, discovery |
| Solidify | `#A78BFA` | `#6D28D9` | Converging, framing, deciding |
| Build | `#FB923C` | `#C2410C` | Making, executing, producing |
| Ship | `#4ADE80` | `#16A34A` | Finalizing, reviewing, releasing |

Phase colors appear as: column header left-border accent, card sigil tint, badge background (12% opacity fill + full-opacity stroke), and phase label text.

---

## 4. Typography

### Typefaces

| Role | Family | Weights |
|---|---|---|
| Display / Editorial | Fraunces (Google Fonts, `opsz` 9–144) | 400 (italic), 500, 600, 700 |
| UI / Body | Inter (Google Fonts) | 400, 500, 600, 700 |
| Code / Mono | JetBrains Mono → Menlo → monospace | 400, 500 |

### Scale

| Name | Size | Line height | Weight | Font | Use |
|---|---|---|---|---|---|
| `display-xl` | 4.2rem | 1.02 | 500 | Fraunces | Hero headline |
| `display-lg` | 2.4rem | 1.1 | 500 | Fraunces | Section headline |
| `display-quote` | 1.55rem | 1.3 | 400 italic | Fraunces | Pull quotes, callouts |
| `label-overline` | 0.82rem | 1.4 | 600 | Inter | Section labels, uppercase category tags |
| `body-lg` | 1.1rem | 1.6 | 400 | Inter | Marketing body |
| `body-md` | 1rem | 1.55 | 400 | Inter | Default body |
| `body-sm` | 0.875rem | 1.5 | 400 | Inter | Captions, secondary text |
| `ui-base` | 0.875rem | 1.4 | 500 | Inter | App UI labels |
| `ui-sm` | 0.78rem | 1.4 | 500 | Inter | Pills, badges, metadata |
| `code` | 0.88em | 1.55 | 400 | JetBrains Mono | Inline code |
| `code-block` | 0.78rem | 1.55 | 400 | JetBrains Mono | Code blocks |

### Letter spacing
- Headings: `-0.025em`
- Overlines / uppercase labels: `+0.16em`
- Wordmark: `-0.01em` (brand name), `-0.04em` (`//`)
- Body: default / `-0.005em`
- Code: default

### Italic treatment
- Fraunces italic used for editorial emphasis and pull quotes only
- `h1 em`, `h2 em`: italic Fraunces, color `var(--forest)` — the visual signature for emphasis in headlines

---

## 5. Spacing

Base unit: **4px**

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Tight inline gap |
| `space-2` | 8px | Inner component padding |
| `space-3` | 12px | Small gaps between elements |
| `space-4` | 16px | Default gap, list item spacing |
| `space-5` | 20px | Medium gaps |
| `space-6` | 24px | Card padding (compact), section subdivision |
| `space-8` | 32px | Card padding (default), component separation |
| `space-10` | 40px | Section breathing room |
| `space-12` | 48px | Section padding |
| `space-14` | 56px | Slide/page padding vertical |
| `space-16` | 64px | Hero vertical rhythm |
| `space-18` | 72px | Hero section padding |
| `space-24` | 96px | Major section breaks |

---

## 6. Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 4px | Inline code, micro tags |
| `radius-sm` | 6px | Icon mark, small badges |
| `radius-md` | 12px | Code blocks, panels |
| `radius-lg` | 14px | macOS window chrome, app window |
| `radius-xl` | 18px | Cards (marketing, pitch deck) |
| `radius-pill` | 999px | Pills, badge labels, CTA buttons |

---

## 7. Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(15,17,21,0.08)` | App surfaces |
| `shadow-md` | `0 10px 30px rgba(15,17,21,0.08)` | Cards, drawers |
| `shadow-lg` | `0 30px 80px rgba(15,17,21,0.18), 0 6px 20px rgba(15,17,21,0.08)` | Main stage / window |
| `shadow-icon` | `drop-shadow(0 14px 32px rgba(15,17,21,0.24))` | Floating icon |
| `shadow-icon-docked` | `drop-shadow(0 1px 2px rgba(15,17,21,0.45))` | Docked menu-bar icon |

---

## 8. Components

### 8a. Card — Marketing

Three variants:

**Cream card** (default)
```
background: #FFFFFF
border: 1px solid var(--cream-edge)
border-radius: 18px
padding: 24px 26px
```

**Forest card** (dark accent)
```
background: var(--forest)
border-radius: 18px
padding: 24px 26px
text color: #F4ECD7
h3 color: #B8C9BD
body/list color: #EBE3CD
strong color: #F4ECD7
code bg: var(--forest-deep), code color: var(--lilac)
```

**Section columns**
- 2-col: `grid-template-columns: 1fr 1fr; gap: 44px`
- 3-col: `grid-template-columns: 1fr 1fr 1fr; gap: 24px`
- Asymmetric: `grid-template-columns: 1.25fr 1fr; gap: 52px`

### 8b. Pill / Badge

```
display: inline-block
background: #FFFFFF
border: 1px solid var(--cream-edge)
border-radius: 999px
padding: 4px 13px
font-size: 0.78em
font-weight: 500
color: var(--ink-soft)
```

Phase badge variant: phase color at 12% opacity fill, full-opacity border, phase color text.

### 8c. Button

**Primary (dark CTA)**
```
background: var(--brand-dark)   /* #0E3A35 */
color: #FFFFFF
border-radius: 999px
padding: 10px 22px
font: Inter 500 0.9rem
letter-spacing: -0.01em
```
Hover: `background: var(--forest-soft)`

**Accent CTA**
```
background: var(--brand-accent)  /* #3DD9B6 */
color: var(--brand-dark)
border-radius: 999px
padding: 10px 22px
font: Inter 600 0.9rem
```

**Ghost / secondary**
```
background: transparent
border: 1px solid var(--cream-edge)
color: var(--ink-soft)
border-radius: 999px
padding: 9px 20px
```

### 8d. Code block

```
background: var(--cream-soft)
border: 1px solid var(--cream-edge)
border-radius: 12px
padding: 16px 20px
font: JetBrains Mono 0.78rem / 1.55
color: var(--ink)
```

Inline code:
```
background: var(--cream-soft)
border: 1px solid var(--cream-edge)
border-radius: 4px
padding: 1px 6px
font-size: 0.88em
color: var(--forest)
```

On forest surface: `background: var(--forest-deep)`, `color: var(--lilac)`, `border-color: var(--forest-soft)`

### 8e. Blockquote (editorial)

```
font-family: Fraunces
font-style: italic
font-size: 1.55rem
line-height: 1.3
color: var(--forest)
font-weight: 400
no border-left
```

Used for: pull quotes, key insight callouts, methodology principles.

### 8f. App panel (dark surface)

```
background: rgb(var(--ds-surface))
border: 1px solid rgb(var(--ds-border))
border-radius: 12px
```

Elevated (drawer/modal):
```
background: rgb(var(--ds-elevated))
border-radius: 14px
box-shadow: shadow-md
```

### 8g. Kanban card (Fish Model)

Anatomy (top to bottom):
1. **Phase accent** — left border `3px solid [phase-color]`
2. **Header row** — context name (Inter 500 ui-base) + archetype sigil pill
3. **Archetype badge** — `Nemo / Tuna / Salmon / Willy`, phase-color tint
4. **Progress bar** — methods completed / total, thin `4px` bar, phase-color fill
5. **Handoff confidence** — small indicator (green/amber/red) aligned right
6. **Blocked indicator** — amber banner (only when blocked)
7. **Artifact count** — small iconographic count, bottom-right

Card size: `240px wide` (default column), `16px padding`, `radius-md`

### 8h. Skip / replay pill (interactive controls)

```
background: rgba(255,255,255,0.9)
backdrop-filter: blur(12px)
border: 1px solid var(--hair)  /* #E6E3DB */
border-radius: 999px
padding: 7px 13px
font-size: 12px
color: var(--ink-2)
```
Hover: `background: white`

---

## 9. Motion

### Easing library

| Name | Curve | Use |
|---|---|---|
| `ease-slide` | `cubic-bezier(.7,0,.2,1)` | Panel slides, desktop transitions |
| `ease-spring` | `cubic-bezier(.22,.9,.28,1.2)` | Drop-in entrances, icon animation |
| `ease-default` | `cubic-bezier(.4,0,.2,1)` | Standard UI transitions |
| `ease-out` | `ease-out` | Exits, fadeouts |

### Duration library

| Name | Duration | Use |
|---|---|---|
| `dur-fast` | 150ms | Hover states, color transitions |
| `dur-base` | 280ms | Component transitions |
| `dur-medium` | 500ms | Opacity transitions, panel reveals |
| `dur-slow` | 700ms | Slide transitions, wallpaper |
| `dur-icon` | 900ms | Icon drop-in and dock animation |
| `dur-breathe` | 2.4s | Live dot pulse loop |

### Animation keyframes

**cell-pop** (Kanban card entrance)
```
from: opacity 0, scale 0.3
to: opacity 1, scale 1
```

**fade-in** (generic reveal)
```
from: opacity 0
to: opacity 1
```

**blink** (live dot)
```
0%, 100%: opacity 1
50%: opacity 0.55
```

**ring-breathe** (live ring)
```
0%, 100%: opacity 0, scale 1
50%: opacity 0.45, scale 1.15
```

**Desk transition** (desktop switch)
- Outgoing: `translateX(-12%)` + `opacity 0`, 700ms ease-slide
- Incoming: `translateX(0)` + `opacity 1`
- Prep: `translateX(12%)` + `opacity 0`, no transition

---

## 10. Marketing Page Layout

### Wrapper
- Max content width: `min(1380px, 94vw)` (`--stage-w`)
- Main stage height: `min(800px, 76vh)` (`--stage-h`)
- Scrollbar: 4px width, no track, border-color thumb, radius 2px

### Hero section
```
min-height: 100vh
padding: 72px 24px 48px
display: flex, column, center-aligned
gap: 28px
```

### Window chrome (macOS simulation)
- Chrome bar: `32px` height, `#EDEAE1` background, `1px` bottom border
- Traffic lights: 3 × `12px` circles, `7px` gap, `#D3CFC3` color
- Title: `12px Inter 500 var(--ink-2)`, centered

### Menubar (inside desktop)
- `28px` height, `rgba(255,255,255,0.62)` + `backdrop-filter: blur(20px) saturate(1.2)`
- `1px` bottom border `rgba(15,17,21,0.08)`
- Right-aligned: icon slot (22px) + clock (56px min-width, tabular-nums) + avatar (18px)

---

## 11. Iconography

No icon library prescribed — use SVG custom marks as needed. Principles:

- **Stroke-based preferred.** `stroke-linecap: round`, `stroke-linejoin: round`.
- **2px stroke** at 16px icon size. Scale proportionally.
- **Monochromatic by default.** Color only for the `//` mark and phase indicators.
- **The `//` operator is the master glyph.** Two diagonal strokes, white + teal. Never decorate it.
- Phase glyphs (future): one simple geometric mark per phase. Consistent with phase color.

---

## 12. Archetype Sigils

Each Fish Model archetype has a visual identity:

| Archetype | Name | Size signal | Certainty | Sigil concept |
|---|---|---|---|---|
| Nemo | Known × Small | Small | High | Simple circle / dot |
| Tuna | Known × Large | Large | High | Elongated ellipse / streak |
| Salmon | Unknown × Small | Small | Low | Forked / split path |
| Willy | Unknown × Large | Large | Low | Open ocean / wave |

Sigils appear in: Kanban card archetype badge, recipe sidebar header, context detail header.  
Colors: always tinted with the **current phase color** of the context. The archetype itself is colorless — the phase colors it.

---

## 13. App-specific UI patterns

### Scrollbars
```
width: 4px
track: transparent
thumb: rgb(var(--ds-border)), border-radius 2px
```

### Font smoothing
`-webkit-font-smoothing: antialiased` everywhere

### Selection
`user-select: none` on app root (not marketing page)

### Focus states
Visible focus ring using brand-accent at 2px offset. Never remove focus outlines without replacing them.

### Backdrop blur usage
- Menubar: `blur(20px) saturate(1.2)` — primary chrome
- Skip/replay pills: `blur(12px)` — floating controls
- App glass surfaces: `blur(16px)` — panels that overlay desktop
- Never apply backdrop-blur on solid backgrounds (no visual effect, wastes GPU)

---

## 14. Surface hierarchy

| Level | Background | Border | Elevation |
|---|---|---|---|
| Canvas | `rgb(var(--ds-bg))` | — | 0 |
| Surface | `rgb(var(--ds-surface))` | `rgb(var(--ds-border))` | 1 |
| Elevated | `rgb(var(--ds-elevated))` | `rgb(var(--ds-border))` | 2 (shadow-md) |
| Overlay | `rgb(var(--ds-elevated))` | `rgb(var(--ds-border-light))` | 3 (shadow-lg) |

Marketing equivalent:
| Level | Background | Border |
|---|---|---|
| Page | `var(--cream)` | — |
| Card | `#FFFFFF` | `var(--cream-edge)` |
| Inset | `var(--cream-soft)` | `var(--cream-edge)` |
| Dark feature | `var(--forest)` | — |

---

## 15. Implementation notes for Claude Design

### Use these files as ground truth
- Marketing CSS variables: `website/index.html` `:root` block
- App CSS variables: `app-web/src/index.css`
- Type system: `app-web/src/types.ts` (Phase, Archetype, Context, Space, FishHandoff)
- Fish Model structure: `methodology/fish-model.md`

### Stack
- App: React + TypeScript + Tailwind v4 + Vite
- CSS approach: Tailwind utility classes + CSS custom properties for theming
- Font loading: Google Fonts (`Fraunces` + `Inter`) via `@import` or `<link>`

### Do not invent new colors
All colors are defined here. If a component needs a color not listed, use an opacity/tint of an existing token. Do not introduce new base hues.

### Phase colors are semantic, not decorative
Never swap phase colors between phases. Explore is always blue. Solidify is always purple. Build is always orange. Ship is always green. These match user's mental model of their own project state.

### The `//` operator
In copy, use sparingly. In UI, the `//` mark (brand-dark bg + white/teal slashes) is the primary brand icon. It should never appear in a degraded form (never just two slashes in plain text as a decoration).

### Marketing tone
Fraunces italic + `--forest` color = emphasis. This is the editorial voice signature. Use it for the single most important phrase in a section. Never use it for more than one sentence per section.
