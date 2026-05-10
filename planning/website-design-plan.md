# DubleSlash — Website Design Plan

## What this is
Single-page marketing website. Full replacement of `app-web/`. Dark, cinematic, minimal copy.
The product demo video is the pitch. Everything else supports it.

---

## Stack
- React 18 + Vite + TypeScript + Tailwind CSS
- Add: `framer-motion` for scroll-driven layer animation
- No other new dependencies

---

## Visual Language

### Palette
| Token | Value | Use |
|-------|-------|-----|
| `#000000` | Pure black | Background everywhere |
| `#FFFFFF` | White | Primary text, headings |
| `#1A1A1A` | Off-black | Layer card fills |
| `#2C2C2C` | Border gray | Thin rules between layers |
| `#6B6B6B` | Muted | Secondary copy, one-liners |
| `#F5F0FF` | Pearl white | Pearl glow core |
| `rgba(245,240,255,0.12)` | Pearl fog | Glow spread |

### Phase accent colors (carry over from design system — use sparingly in layers section)
- Explore: `#38BDF8` sky blue
- Solidify: `#A78BFA` purple
- Build: `#FB923C` orange
- Ship: `#4ADE80` green

### Typography
- Font: **Inter** (load from Google Fonts or bundle)
- `//` brand mark: mono, weight 700, size 96–120px at hero scale
- Section headings: Inter 500–600, 48–64px
- Layer labels: Inter Mono 600, 18–22px
- Layer one-liners: Inter 400, 16–18px, muted
- Pricing card titles: Inter 600, 24px
- Body / footnotes: Inter 400, 14–16px

### Pearl glow
Radial gradient centered on a focal point. Two animation states:
- **Idle pulse**: slow 4s breathe — `opacity` 0.4 → 0.8 → 0.4, `scale` 0.95 → 1.05 → 0.95
- **Activated flash**: triggered on load (video section) — instant bloom then slow fade over 2s
CSS `@keyframes`, no JS needed. Pointer-events: none always.

```css
@keyframes pearl-pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.95); }
  50%       { opacity: 0.8; transform: scale(1.05); }
}
@keyframes pearl-flash {
  0%   { opacity: 1; transform: scale(1.4); }
  100% { opacity: 0.4; transform: scale(1.0); }
}
```

---

## Page Sections

### Section 1 — DEMO

**Purpose:** Video is the first thing. No copy. No navigation. Just the film.

**Layout:**
- `100vw × 100vh`, black background
- `<video>` element: `autoplay muted loop playsinline`, `object-fit: cover`, fills frame
- Pearl glow element: fixed, centered, 600px diameter, activates on page load
- Bottom-left watermark: `//` in white mono, 14px, 40% opacity — very subtle
- Placeholder while no video exists: pure black with pearl pulsing, centered `//` in mono at 64px

**Video file:** `/public/demo.mp4` — drop-in. No hosted streaming needed for launch.

**Transitions:** When scrolling past, video dims to 0% opacity smoothly (scroll-driven opacity).

---

### Section 2 — LAYERS

**Purpose:** Show the system without explaining it. Four layers, each expanding as user scrolls. No heading. No framing copy. The layers are self-evident.

**Layout:**
- `100vw`, height: 100vh (scroll-pinned while layers animate)
- Black background
- Layers stack vertically at rest, each is a thin horizontal rule (2px white, 20% opacity)
- On scroll: each layer expands — `width` grows from 0 to full viewport, `height` grows from 2px to ~80px
- Text fades in during expansion (opacity 0 → 1)
- Stagger: Layer 1 opens first, then 2, 3, 4 — each tied to a quarter of the scroll range within the section

**Layer content:**

| # | Label | One-liner | Phase color dot |
|---|-------|-----------|-----------------|
| 1 | `//` | One keystroke. Any tool. Always. | none |
| 2 | Fish Model | Knows your phase. Picks the right agent. | four tiny dots: blue/purple/orange/green |
| 3 | Agents | 13 workers. In your tools, on your device, across your team. | none |
| 4 | `<fish-handoff>` | The artifact that survives everything. | none |

**Layer visual anatomy (expanded state):**
```
[thin top rule — full width]
[label: mono left]          [one-liner: right, muted]
```

**Framer Motion implementation:**
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef })
// Layer n opens when scrollYProgress passes n/4
const layer1Width = useTransform(scrollYProgress, [0.0, 0.25], ['0%', '100%'])
const layer2Width = useTransform(scrollYProgress, [0.25, 0.5], ['0%', '100%'])
// etc.
```

Section is `position: sticky; top: 0` with a scroll container tall enough to drive the animation (~400vh).

---

### Section 3 — GET IT

**Purpose:** Download + pricing. Big, clear, no friction.

**Layout:**
- Black background
- Top: `//` in white mono, 80px. Below it: "Get DubleSlash" in Inter 400, 20px, muted.
- Download button: full-width or 320px wide, white fill, black text, Inter 600 16px
  - Label: "Download for macOS" + small Apple logo
  - Subtext below button: "Also available: CLI · Web"
- Pricing: three cards side by side, centered, max-width 900px
  - Card style: `bg-[#111111]`, `border border-[#2C2C2C]`, rounded-2xl, padding 32px
  - Top: tier name + price, Middle: 3 feature lines, Bottom: CTA button

**Pricing cards:**

| Free | Pro | Team |
|------|-----|------|
| Solo. Always free. | $12 / month | $24 / seat / month |
| Fish agents in your tools | Personal agents + Context Cloud | Full system agents + team graph |
| Local capture | Cross-session memory | Digest — replaces standups |
| Open source | Cipher redaction | Beacon handoff routing |
| [Download] | [Get Pro] | [Get Team] |

Card CTA buttons:
- Free: white outline button
- Pro: white filled button (primary)
- Team: white filled button (primary)

---

### Section 4 — SIGNAL

**Purpose:** Social proof + mission. Close the page. No navigation, no links — just the statement.

**Layout:**
- Black background, generous vertical padding (120px top/bottom)
- Two or three quote blocks, centered, max-width 640px
  - Quote text: Inter 400, 20px, white
  - Attribution: Inter 400, 14px, muted — "— Studio Name"
  - Placeholder copy for launch:
    - "// changed how we hand off work between designers and developers."
    - "We stopped doing standups. The Digest does it better."
- Mission line: very large, centered, white, Inter 300, 48–64px:

  **"Context that survives everything."**

  Alternatives:
  - "// keeps you in context."
  - "Stay in the work."
  - "One line. Full context. Every time."

- Bottom: tiny `//` logotype + "DubleSlash" in Inter Mono 12px, 40% opacity. No links, no footer nav.

---

## File Structure (post-rewrite)

```
app-web/
  index.html
  package.json          ← add framer-motion
  src/
    main.tsx
    App.tsx             ← single scroll page, no router
    index.css           ← full reset, dark globals, pearl keyframes
    sections/
      Demo.tsx
      Layers.tsx
      GetIt.tsx
      Signal.tsx
    components/
      Pearl.tsx         ← the glow element, reusable
      PricingCard.tsx
    data/
      layers.ts         ← layer label + one-liner data
      pricing.ts        ← tier data
  public/
    demo.mp4            ← drop video here when ready
```

---

## Build order

1. `index.css` — full reset, `#000` background, Inter font import, pearl keyframes
2. `Pearl.tsx` — the glow component (used in Demo and optionally Signal)
3. `Demo.tsx` — full-screen video section with pearl and placeholder state
4. `Layers.tsx` — scroll-driven four-layer animation
5. `GetIt.tsx` — download button + pricing cards
6. `Signal.tsx` — quotes + mission line
7. `App.tsx` — compose all sections, remove old Panel/app logic

---

## Open items (resolve during build)

- [ ] Mission line — pick one from the four options above
- [ ] Quote copy — placeholder until cohort feedback arrives; mark clearly with `// TODO: real quotes`
- [ ] Video — `/public/demo.mp4` slot ready; placeholder is pure black + pearl pulse
- [ ] Download URL — `/public/DubleSlash.dmg` or external link; TBD at launch
