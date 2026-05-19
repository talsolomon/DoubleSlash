---
marp: true
theme: default
paginate: false
style: |
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400;1,9..144,500;1,9..144,600;1,9..144,700&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --cream: #F4ECD7;
    --cream-soft: #FAF4E2;
    --cream-edge: #E0D5BB;
    --ink: #14140F;
    --ink-soft: #2D2A22;
    --muted: #6E6A5A;
    --forest: #1E3B2C;
    --forest-deep: #112318;
    --forest-soft: #2A4D3B;
    --lilac: #DDC9F4;
    --lilac-deep: #B69EE0;
    --sage: #8B9A6E;
    --terra: #C97A5A;
    --win: #1E3B2C;
    --partial: #C97A5A;
    --miss: #B6AC95;
  }

  section {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--cream);
    color: var(--ink);
    padding: 56px 72px;
    font-size: 19px;
    line-height: 1.55;
    letter-spacing: -0.005em;
  }

  section.forest { background: var(--forest); color: #F4ECD7; }

  h1, h2 {
    font-family: 'Fraunces', 'Tiempos', Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
    margin: 0 0 0.35em 0;
  }
  h1 { font-size: 4.2rem; line-height: 1.02; font-weight: 500; }
  h2 { font-size: 2.4rem; line-height: 1.1; font-weight: 500; margin-bottom: 0.4em; }
  h2 em, h1 em { font-style: italic; font-weight: 400; color: var(--forest); }
  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    margin: 0 0 0.55em 0;
  }

  p { color: var(--ink-soft); margin: 0 0 0.7em 0; }
  strong { color: var(--ink); font-weight: 600; }
  em { font-style: italic; }
  ul { color: var(--ink-soft); padding-left: 1.1em; margin: 0.5em 0; }
  li { margin-bottom: 0.35em; }

  code {
    background: var(--cream-soft);
    color: var(--forest);
    border: 1px solid var(--cream-edge);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 0.88em;
    font-family: 'JetBrains Mono', 'Menlo', monospace;
  }
  pre {
    background: var(--cream-soft);
    border: 1px solid var(--cream-edge);
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--ink);
  }
  pre code { background: transparent; border: 0; padding: 0; color: var(--ink); }

  blockquote {
    border-left: 0;
    padding: 0;
    margin: 0;
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-size: 1.55rem;
    line-height: 1.3;
    color: var(--forest);
    font-weight: 400;
  }
  blockquote p { color: var(--forest); margin: 0; }

  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; }
  .columns-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
  .columns-asym { display: grid; grid-template-columns: 1.25fr 1fr; gap: 52px; }

  .card { background: #FFFFFF; border: 1px solid var(--cream-edge); border-radius: 18px; padding: 24px 26px; }
  .card-cream { background: #FFFFFF; border: 1px solid var(--cream-edge); border-radius: 18px; padding: 24px 26px; }
  .card-forest { background: var(--forest); color: #F4ECD7; border-radius: 18px; padding: 24px 26px; }
  .card-forest h3 { color: #B8C9BD; }
  .card-forest p, .card-forest li { color: #EBE3CD; }
  .card-forest strong { color: #F4ECD7; }
  .card-forest code { background: var(--forest-deep); color: var(--lilac); border-color: var(--forest-soft); }

  .pill {
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid var(--cream-edge);
    border-radius: 999px;
    padding: 4px 13px;
    font-size: 0.78em;
    font-weight: 500;
    color: var(--ink-soft);
    margin: 2px 4px 4px 0;
  }
  .pill-forest { background: var(--forest); color: #F4ECD7; border-color: var(--forest); }
  .pill-lilac { background: var(--lilac); border-color: var(--lilac-deep); color: var(--forest-deep); }
  .pill-sage { background: #DDE3CC; border-color: var(--sage); color: var(--forest); }

  .stat-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 2.7rem;
    font-weight: 500;
    line-height: 1;
    color: var(--forest);
    letter-spacing: -0.03em;
    margin-bottom: 0.25em;
  }
  .stat-label { color: var(--muted); font-size: 0.85em; line-height: 1.45; }

  table { width: 100%; border-collapse: collapse; font-size: 0.92em; margin: 0; }
  th {
    text-align: left;
    padding: 9px 10px;
    color: var(--muted);
    font-size: 0.7em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border-bottom: 1px solid var(--cream-edge);
  }
  td {
    padding: 10px;
    color: var(--ink-soft);
    border-bottom: 1px solid var(--cream-edge);
    vertical-align: top;
  }
  td strong { color: var(--ink); }

  /* Forest section overrides */
  section.forest h1, section.forest h2 { color: #F4ECD7; }
  section.forest h1 em, section.forest h2 em { color: var(--lilac); }
  section.forest h3 { color: #B8C9BD; }
  section.forest p, section.forest li, section.forest ul { color: #EBE3CD; }
  section.forest strong { color: #F4ECD7; }
  section.forest code { background: var(--forest-deep); color: var(--lilac); border-color: var(--forest-soft); }
  section.forest pre { background: var(--forest-deep); border-color: var(--forest-soft); color: #EBE3CD; }
  section.forest pre code { color: #EBE3CD; }
  section.forest blockquote, section.forest blockquote p { color: var(--lilac); }
  section.forest th { color: #B8C9BD; border-color: var(--forest-soft); }
  section.forest td { color: #EBE3CD; border-color: var(--forest-soft); }
  section.forest td strong { color: #F4ECD7; }
  section.forest .pill { background: var(--forest-deep); color: #EBE3CD; border-color: var(--forest-soft); }
  section.forest .pill-lilac { background: var(--lilac); color: var(--forest-deep); border-color: var(--lilac); }
  section.forest .stat-num { color: var(--lilac); }
  section.forest .stat-label { color: #B8C9BD; }
  section.forest .card { background: var(--forest-soft); border-color: var(--forest-deep); color: #EBE3CD; }
  section.forest .card h3 { color: var(--lilac); }
  section.forest .card strong { color: #F4ECD7; }
  section.forest .card-cream { background: var(--cream); color: var(--ink); border-color: var(--cream-edge); }
  section.forest .card-cream h3 { color: var(--muted); }
  section.forest .card-cream p, section.forest .card-cream li { color: var(--ink-soft); }
  section.forest .card-cream strong { color: var(--ink); }

  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    margin-bottom: 1em;
  }
  section.forest .eyebrow { color: #B8C9BD; }
  .lede {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.35;
    color: var(--forest);
    margin: 0.4em 0 1.2em 0;
  }
  section.forest .lede { color: var(--lilac); }
  .footer-line { font-size: 0.85em; color: var(--muted); margin-top: 1em; }
  section.forest .footer-line { color: #B8C9BD; }
  .rule { height: 1px; background: var(--cream-edge); margin: 1.4em 0; border: 0; }
  section.forest .rule { background: var(--forest-soft); }
  .callout {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-size: 1.2rem;
    color: var(--forest);
    line-height: 1.4;
    margin: 0 0 0.6em 0;
  }
  section.forest .callout { color: var(--lilac); }
  .hero-sub {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.5rem;
    line-height: 1.4;
    font-weight: 400;
    font-style: italic;
    max-width: 760px;
  }
  section.forest .hero-sub { color: #F4ECD7; font-style: normal; font-weight: 400; }

  /* Storyboard frames for the cross-tool moment */
  .storyboard { display: grid; grid-template-columns: 1fr 28px 1fr 28px 1fr; gap: 0; align-items: stretch; margin-top: 0.6em; }
  .frame {
    background: #FFFFFF;
    border: 1px solid var(--cream-edge);
    border-radius: 18px;
    padding: 22px 22px;
    display: flex;
    flex-direction: column;
  }
  .frame .step-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.6rem;
    color: var(--forest);
    font-style: italic;
    margin-bottom: 0.2em;
  }
  .frame .step-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    margin-bottom: 0.6em;
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lilac-deep);
    font-size: 1.6rem;
  }

  /* Competitive matrix */
  .matrix { font-size: 0.86em; }
  .matrix th { font-size: 0.66em; padding: 8px 6px; text-align: center; }
  .matrix th.row-header { text-align: left; padding-left: 12px; }
  .matrix td { padding: 9px 6px; text-align: center; font-family: 'Fraunces', Georgia, serif; font-size: 1.15em; line-height: 1; }
  .matrix td.competitor-name { text-align: left; padding-left: 12px; font-family: 'Inter', sans-serif; font-size: 0.9em; }
  .matrix tr.us { background: rgba(221, 201, 244, 0.4); }
  .matrix tr.us td.competitor-name { font-weight: 600; color: var(--ink); }
  .win { color: var(--win); font-weight: 600; }
  .partial { color: var(--partial); }
  .miss { color: var(--miss); }

  /* Pain → payoff table */
  .pain-table { font-size: 0.92em; }
  .pain-table td { padding: 12px 14px; vertical-align: top; }
  .pain-table .pain { font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.05em; }
  .pain-table .cost { color: var(--terra); font-weight: 600; font-family: 'Fraunces', Georgia, serif; }

  /* Team monogram */
  .monogram {
    width: 110px;
    height: 110px;
    border-radius: 999px;
    background: var(--lilac);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fraunces', Georgia, serif;
    font-size: 3.2rem;
    font-weight: 500;
    color: var(--forest);
    margin-bottom: 0.6em;
  }
  section.forest .monogram { background: var(--lilac); color: var(--forest); }

  /* Use of funds bar */
  .funds-bar { display: flex; height: 56px; border-radius: 12px; overflow: hidden; margin: 0.6em 0 1em 0; }
  .funds-seg { display: flex; align-items: center; justify-content: center; color: #F4ECD7; font-weight: 600; font-size: 0.9em; }
  .funds-seg.eng { background: var(--forest); flex: 60; }
  .funds-seg.gtm { background: var(--forest-soft); flex: 30; }
  .funds-seg.infra { background: var(--lilac-deep); color: var(--forest-deep); flex: 10; }

  /* Big ask number */
  .ask-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 5rem;
    font-weight: 500;
    line-height: 1;
    color: var(--forest);
    letter-spacing: -0.04em;
    margin: 0.2em 0;
  }
  section.forest .ask-num { color: var(--lilac); }
---

<!-- _class: forest -->

<div class="eyebrow">Duble//Slash · Seed deck · April 2026</div>

# The runtime for<br>*AI-assisted* product work.

<br>

<p class="hero-sub">A <strong>desktop app</strong> + an <strong>agent fabric</strong> that captures every AI session, redacts what shouldn't leave, and moves your work between Claude, Cursor, ChatGPT, Terminal, Perplexity.</p>

<br>

<span class="pill pill-lilac">Context Cloud</span> <span class="pill">13 named agents</span> <span class="pill">Cross-tool runtime</span> <span class="pill">Local-first</span>

<br><br>

<div class="footer-line"><strong style="color: #F4ECD7;">Tal Solomon</strong> &nbsp;·&nbsp; <strong style="color: #F4ECD7;">Shenhav Maman</strong> &nbsp;·&nbsp; co-founders</div>

---

<div class="eyebrow">The shape of the problem</div>

## AI is *everywhere*. And *nowhere*.

<div class="lede">Every tool you open has an AI now. None of them remember what you did in the other one.</div>

<div class="columns">

<div class="card">

<h3>Inside any one tool</h3>

AI is incredible. A wireframe in three minutes. A spec in five. A working prototype before lunch.

You ship more receipts in a day than you used to in a week.

</div>

<div class="card-forest">

<h3>The moment you switch tools</h3>

You're a stranger again. New chat. New blank. **Re-paste the brief, re-paste the constraints, re-paste yesterday's decision.**

The work doesn't carry. Only you do — and you're tired of paraphrasing.

</div>

</div>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.4rem; color: var(--forest); line-height: 1.35;">The layer that carries your work <em>between</em> tools is missing — and AI made it the most valuable real estate of the next decade.</p>

---

<div class="eyebrow">The cost is loud — and now public</div>

## Output up. *Shipped value* down.

<div class="columns-asym">

<div>

<div class="columns" style="gap: 20px;">

<div class="card">
<div class="stat-num">19% slower</div>
<div class="stat-label"><strong>METR · Jul 2025</strong> — devs with Cursor + Claude. Forecast 24% faster, measured 19% slower.</div>
</div>

<div class="card">
<div class="stat-num">+91%</div>
<div class="stat-label"><strong>Faros AI 2025</strong> — PR review time among high-AI-adoption teams. The bottleneck moved downstream.</div>
</div>

</div>

<br>

<div class="columns" style="gap: 20px;">

<div class="card">
<div class="stat-num">25% → &lt;10%</div>
<div class="stat-label"><strong>GitClear 2025</strong> — refactor share, 211M lines from Google / MS / Meta. Code clones up 4×.</div>
</div>

<div class="card">
<div class="stat-num">40% → 29%</div>
<div class="stat-label"><strong>Stack Overflow 2025</strong> — trust in AI accuracy YoY (49,000+ devs).</div>
</div>

</div>

</div>

<div>

<blockquote style="font-size: 1.4rem; line-height: 1.3;">90%+ of a deliverable's quality is decided by the process that produced it.</blockquote>

<br>

<p>AI made the receipt <strong>free.</strong> Wireframes in seconds. AC in a paragraph. A brief in three prompts.</p>

<p>The receipt is now cheap; <strong>the process behind it is exactly as expensive as it ever was.</strong></p>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.2rem;">We started shipping receipts without doing the work — and wondered why the product wasn't getting better.</p>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">Introducing</div>

# Duble//Slash.

<p class="hero-sub">A desktop app that captures every AI session, redacts what shouldn't leave, and moves your work between tools — operated by 13 named agents, four of which live <em>inside</em> Claude / Cursor / ChatGPT.</p>

<br>

<div class="columns">

<div class="card-cream">

<h3>The Context Cloud</h3>

Desktop app + team graph. Captures every session, locally and encrypted. Redacts secrets before they leave. Syncs handoffs across tools.

The fish-flow board renders every active context — head-to-tail, with an agent and a guard per card.

</div>

<div class="card-cream">

<h3>The agent fabric</h3>

**4 operators** inside your AI tool — Dora · Sol · Bran · May. Type `//`, get the operator for the active phase.

**9 system agents** in the cloud — Tally, Cipher, Relay, Beacon, Pack, Echo, Twin, Gate, Loom. Capture, route, narrate, enforce.

</div>

</div>

<br>

<p style="color: var(--lilac); font-style: italic; font-family: 'Fraunces', Georgia, serif; font-size: 1.15rem; margin: 0;">One install. Twenty seconds. <code style="color: var(--lilac);">npx @dubleslash/install</code></p>

---

<div class="eyebrow">The product · in motion</div>

## Sarah finishes a brief in *Claude*. Marcus picks it up in *Cursor*. No re-pasting.

<div class="storyboard">

<div class="frame">
<div class="step-num">01</div>
<div class="step-title">Sarah · Claude Desktop</div>
<p>Finishes a Solidify session on the billing redesign.</p>
<p><strong>Sol</strong> emits a <code>&lt;FLOW-handoff&gt;</code> to Builder.</p>
<p>She hits <strong>"push to team."</strong></p>
</div>

<div class="arrow">›</div>

<div class="frame">
<div class="step-num">02</div>
<div class="step-title">The Cloud · in flight</div>
<p><strong>Cipher</strong> diffs the handoff. Two strings flagged. Sarah edits, approves.</p>
<p><strong>Relay</strong> queues, uploads, the team graph acks.</p>
<p><strong>Beacon</strong> pings Marcus.</p>
</div>

<div class="arrow">›</div>

<div class="frame">
<div class="step-num">03</div>
<div class="step-title">Marcus · Cursor</div>
<p>Opens the card. Clicks <em>"get pack."</em></p>
<p><strong>Pack</strong> assembles brief, AC, interview nuggets, sigil history.</p>
<p>Marcus types <code>//build</code> and starts <strong>cold.</strong></p>
</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.3rem; color: var(--forest); margin: 0;">No "where's the brief?" No "copy the handoff into Slack." No re-briefing.</p>

---

<div class="eyebrow">The Context Cloud</div>

## Local-first capture. *Cloud-rendered* team graph. Glass kitchen.

<div class="columns-asym">

<div>

<pre>
┌── ON YOUR DEVICE ─────────────────────┐
│                                        │
│  Claude · Cursor · ChatGPT · Terminal │
│                  ▼                     │
│  Capture · Redaction · Sync           │
│  (encrypted local SQLite)             │
│                                        │
└────────────────┬───────────────────────┘
                 ▼  encrypted transport
┌── CONTEXT CLOUD ──────────────────────┐
│                                        │
│  team graph · cards · handoffs        │
│  sigils · artifacts · trust receipts  │
│                                        │
│  Beacon · Pack · Echo                 │
│  Twin · Gate · Loom                   │
│                                        │
└────────────────────────────────────────┘
</pre>

</div>

<div>

<h3>Glass kitchen</h3>

Every action visible. Every action overridable. Every agent disable-able without breaking the rest.

<br>

<h3>Local-first</h3>

Raw session content stays on your machine. Encrypted SQLite, key in macOS Keychain. Nothing leaves without a redaction preview you approve.

<br>

<h3>Cross-tool by default</h3>

Card IDs are stable across tools. Close Claude, open Cursor — the same card, the same handoff, the same context.

</div>

</div>

---

<div class="eyebrow">The agent fabric · 13, named, layered</div>

## *Operators* in your AI tool. *System agents* in the cloud.

<div class="columns">

<div>

<h3>Operators · OSS · inside your AI tool</h3>

<table>
<tbody>
<tr><td><code>//explore</code></td><td><strong>Dora</strong></td><td>Opens the aperture. Refuses to commit.</td></tr>
<tr><td><code>//solidify</code></td><td><strong>Sol</strong></td><td>Locks the brief. One shape.</td></tr>
<tr><td><code>//build</code></td><td><strong>Bran</strong></td><td>Executes the locked shape.</td></tr>
<tr><td><code>//ship</code></td><td><strong>May</strong></td><td>Narrates release. Trust receipts.</td></tr>
</tbody>
</table>

<p style="margin-top: 0.6em; font-size: 0.92em;">43 named skills shipped. Free forever. Paste into <code>CLAUDE.md</code> / <code>.cursorrules</code> this weekend.</p>

</div>

<div>

<h3>System agents · cloud · commercial</h3>

<table>
<tbody>
<tr><td><strong>Tally</strong></td><td>Capture · OSS</td></tr>
<tr><td><strong>Cipher</strong></td><td>Redaction · OSS</td></tr>
<tr><td><strong>Relay</strong></td><td>Sync · V1</td></tr>
<tr><td><strong>Beacon</strong></td><td>Handoff routing · V1</td></tr>
<tr><td><strong>Pack</strong></td><td>Pickup bundles · V1</td></tr>
<tr><td><strong>Echo</strong></td><td>Daily digest · V1.5</td></tr>
<tr><td><strong>Twin</strong></td><td>Personal twin · V1.5</td></tr>
<tr><td><strong>Gate · Loom</strong></td><td>Process enforcement · V2</td></tr>
</tbody>
</table>

</div>

</div>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.05rem; color: var(--muted); border-top: 1px solid var(--cream-edge); padding-top: 0.8em;"><strong style="color: var(--forest);">FLOW · the method underneath.</strong> Four phases (Explore · Solidify · Build · Ship) × four archetypes the AI infers (Nemo · Tuna · Salmon · Willy). User picks Small or Big — the AI does the rest. 50 years of public-domain craft, agent-operable. <strong style="color: var(--forest);">Open spec.</strong></p>

---

<div class="eyebrow">The handoff · the trust</div>

## The cross-tool API. *Privacy* by default.

<div class="columns">

<div>

<h3>The handoff is the receipt</h3>

<pre>
&lt;FLOW-handoff&gt;
from: solidifier
to: builder
context_id: billing-2026-04
size: big
archetype: tuna
locked:
  - "Hybrid list-plus-drawer."
  - "Group by billing period."
open:
  - "Empty-state copy — Wed."
artifacts:
  - briefs/billing.md
  - figma/v3
confidence: 0.9
guard: tal@dubleslash.com
&lt;/FLOW-handoff&gt;
</pre>

<p style="font-size: 0.9em;">Lands on disk when you close Claude. Marcus's Builder reads it cold tomorrow.</p>

</div>

<div>

<h3>What stays on your device</h3>

- Raw session content. Every word.
- Encrypted SQLite, key in macOS Keychain.
- Capture (Tally) is on-device only.
- Push to cloud is **user-controlled, per-card.**

<br>

<h3>What syncs to the cloud</h3>

- Process state — sigil, phase, decisions.
- Handoffs — the `<FLOW-handoff>` blocks.
- Outputs you explicitly publish.

Not the raw chat. Not the secrets. **Cipher** gates every artifact.

<br>

<h3>The trust receipt</h3>

Signed at every release. *17 files · 1 component · 2 redactions.* Auditability is a feature, not a checkbox.

</div>

</div>

---

<div class="eyebrow">Why now</div>

## Three windows that *don't stay open*.

<div class="columns-3">

<div class="card">

<h3>1 · The paradox is public</h3>

DORA, METR, Faros, GitClear. 2024–2025 was the year the data landed. Teams know output is up and shipped value isn't. **First mover on naming the missing layer wins.**

</div>

<div class="card">

<h3>2 · The vacuum</h3>

BMAD has a 6-month head start on engineering, none on design. Anthropic, Cursor, GitHub haven't claimed "runtime layer" yet. **The slot is empty today.**

</div>

<div class="card">

<h3>3 · The substrate landed</h3>

`AGENTS.md` and `CLAUDE.md` auto-loading across Copilot, Cursor, Claude Code is the right substrate for `npx`-install. **Twelve months ago this took three pastes.**

</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.25rem; color: var(--forest);">The category window is 12–18 months. After that, the runtime layer either has us, has BMAD, or gets absorbed into a tool.</p>

---

<div class="eyebrow">The case · pain → payoff</div>

## What the broken layer costs you, *today*.

<table class="pain-table">
<thead>
<tr><th>The pain</th><th>What it costs · per designer · per week</th><th>What DS does about it</th></tr>
</thead>
<tbody>
<tr>
<td class="pain">"I don't know where I am."</td>
<td><span class="cost">~5 hrs/wk</span> hunting context across 5 tools.</td>
<td>Desktop fish-flow board. Every active context, head-to-tail, one screen.</td>
</tr>
<tr>
<td class="pain">"I don't trust this is saved."</td>
<td><span class="cost">2–4 hrs</span> per lost session × 3 sessions/mo.</td>
<td><strong>Tally</strong> captures every session, encrypted on device. Resumable across tool restarts.</td>
</tr>
<tr>
<td class="pain">"AI doesn't guide me."</td>
<td>Bad receipts shipped → <span class="cost">3-day rework cycles</span>.</td>
<td>4 named operators run named methods (heuristic scan, premortem, journey map) — not chat.</td>
</tr>
<tr>
<td class="pain">"It has no UX instinct."</td>
<td>Solutions before problems → <span class="cost">3-week pivots</span>.</td>
<td><strong>Dora</strong> opens the aperture. Salmon archetype mandates research before sketch.</td>
</tr>
<tr>
<td class="pain">"Switching tools, I start over."</td>
<td><span class="cost">~40 min/day</span> re-pasting brief + constraints.</td>
<td><strong>Relay</strong> + <strong>Pack</strong> — handoff lands in the next tool, ready to read cold.</td>
</tr>
<tr>
<td class="pain">"I can't see the project."</td>
<td><span class="cost">5+ hrs/wk</span> in standups, status meetings, Slack threads.</td>
<td><strong>Echo</strong> daily digest replaces the async standup. Sigil-aware, blocker-first.</td>
</tr>
<tr>
<td class="pain">"No history of who decided what."</td>
<td>Audits broken; accountability decided <em>after</em> incidents.</td>
<td>Trust receipts + guard role. Every card answers <em>"who decided?"</em> by name + timestamp.</td>
</tr>
</tbody>
</table>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--forest); margin: 0;">For a 10-person design + dev team: <strong style="color: var(--ink);">~120 hours/month</strong> recovered. <strong style="color: var(--ink);">~$180k/yr</strong> at $125/hr blended.</p>

---

<div class="eyebrow">Competitive landscape</div>

## Tool-bound, *all of them*. We're the runtime *between*.

<table class="matrix">
<thead>
<tr>
<th class="row-header">Competitor</th>
<th>Cross-tool capture</th>
<th>Method layer</th>
<th>Designer-shaped</th>
<th>Multiplayer handoff</th>
<th>Local-first + redaction</th>
<th>Open spec</th>
<th>Trust receipts</th>
<th>Archetype-aware</th>
</tr>
</thead>
<tbody>
<tr>
<td class="competitor-name">Claude Projects</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Cursor Rules</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">ChatGPT Projects</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">BMAD</td>
<td class="miss">✗</td><td class="win">✓</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">—</td><td class="win">✓</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Copilot Workspaces</td>
<td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Mem.ai · Granola</td>
<td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Linear + AI · Notion AI</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td>
</tr>
<tr class="us">
<td class="competitor-name">Duble//Slash</td>
<td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td>
</tr>
</tbody>
</table>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.15rem; color: var(--forest); margin: 0;">Anthropic, Cursor, GitHub each defend a tool. <strong style="color: var(--ink);">Our position is the one none of them can take without giving up their wedge.</strong></p>

---

<div class="eyebrow">Market shape</div>

## *84% of devs* use AI. None of them have a runtime.

<div class="columns-3">

<div class="card">
<div class="stat-num">84%</div>
<div class="stat-label"><strong>Stack Overflow 2025</strong> — devs using or planning AI tools (49,000+). 51% of pros use AI daily.</div>
</div>

<div class="card">
<div class="stat-num">75%</div>
<div class="stat-label"><strong>Microsoft + LinkedIn 2024</strong> — knowledge workers using GenAI. 78% bring their own.</div>
</div>

<div class="card">
<div class="stat-num">46%</div>
<div class="stat-label"><strong>Anthropic Economic Index Jan 2026</strong> — share of consumer Claude that's work-related. 1M conversation sample.</div>
</div>

</div>

<hr class="rule"/>

<div class="columns-3">

<div>
<h3>Beachhead</h3>
Israeli design leaders + 30 SMB product teams (Tal's network). Land via methodology; expand via runtime.
</div>

<div>
<h3>Wedge</h3>
Designers — feel the seven pains hardest, no method-shaped tool today. Pull dev + PM along.
</div>

<div>
<h3>Adjacent</h3>
Technical PMs running AI-assisted product work. The DORA / METR data is exactly their problem.
</div>

</div>

---

<div class="eyebrow">Why this is defensible</div>

## *Runtime* is the moat. Methodology is the distribution.

<div class="columns-3">

<div class="card">

<h3>1 · Cross-tool runtime</h3>

Anthropic won't build cross-tool. Cursor won't. Each has a tool to defend. **Our runtime sits *between* tools** — the position none of them can take without giving up their wedge.

</div>

<div class="card">

<h3>2 · Lineage credibility</h3>

The methodology synthesizes 50+ years of named, public-domain craft — Bánáthy, Cooper, Saffer, Torres, Singer, Holtzblatt, Fitzpatrick. **A vendor framework can't fake this.**

</div>

<div class="card">

<h3>3 · Network effect</h3>

Once a team adopts FLOW, every new hire onboards on the same vocabulary. Every cross-team handoff uses the same block format. **Switching costs compound.**

</div>

</div>

---

<div class="eyebrow">Pricing</div>

## Open *forever*. Runtime sold as a single tier.

<div class="columns-3">

<div class="card">

<h3>OSS</h3>

<div class="stat-num">Free</div>

The four operator agents. The methodology spec. The handoff format. Forever.

<br>

<code>npx @dubleslash/install</code>

</div>

<div class="card">

<h3>Individual</h3>

<div class="stat-num">$4 / mo</div>

Cross-tool sync. Desktop app. Trust receipts. Redaction. Single-machine + macOS menu-bar client.

Designers, ICs, solo PMs.

</div>

<div class="card">

<span class="pill pill-forest">Recommended</span>

<h3 style="margin-top: 0.6em;">Team</h3>

<div class="stat-num">$12 / seat / mo</div>

Everything in Individual + multiplayer (Twin), digest (Echo), per-team `flow.yaml` (Gate), onboarding (Pack), analytics (Loom).

3-seat minimum.

</div>

</div>

<p style="text-align: center; color: var(--muted); margin-top: 1em; font-style: italic; font-size: 0.9em;">The runtime is worth multiple seats of Notion or Linear-equivalent. We undercut intentionally during the methodology-as-distribution phase.</p>

---

<div class="eyebrow">Go-to-market</div>

## *Methodology-as-distribution.* 30-day OSS launch. Founder-led.

<div class="columns">

<div class="card">

<h3>Phase 1 · Launch · D-3 → D+30</h3>

- 7-post blog calendar around launch day. Flagship by Tal; design-angle by Shenhav.
- Show HN + X thread on D-0. Product Hunt + LinkedIn on D+1.
- 39 Israeli design leaders DM'd directly.
- TLV / Herzliya cluster days — 4–6 demos per day.

</div>

<div class="card">

<h3>Phase 2 · Activate · M2 → M4</h3>

- 1k weekly active users on the OSS install.
- 5k GitHub stars. 10+ documented self-host deployments.
- First paying team. End-to-end killer demo posted.
- Anthropic conversation opened (M5 metric).

</div>

</div>

<p style="margin-top: 1.2em;">Every article credits the public-domain lineage and points to the open spec. People who say <em>"I could implement this myself"</em> are validation, not the leak. <strong>99% don't. The 1% who do are not the customer base.</strong></p>

---

<div class="eyebrow">Roadmap</div>

## OSS Launch → V1 → V1.5 → V2.

<table>
<thead>
<tr><th>Milestone</th><th>Ships</th><th>Date</th></tr>
</thead>
<tbody>
<tr>
<td><strong>OSS Launch · M1</strong></td>
<td>4 operators · install · Tally · Cipher · macOS menu-bar · 4 launch articles</td>
<td>May 2026</td>
</tr>
<tr>
<td><strong>V1 · M2</strong></td>
<td>Cross-tool sync (Relay) · desktop app · context onboarding · guard · trust receipts · Pack · Echo</td>
<td>Sep 2026</td>
</tr>
<tr>
<td><strong>V1.5 · M3</strong></td>
<td>Multiplayer (Twin) · digest (Echo) · per-team `flow.yaml` (Gate) · paid tier launch</td>
<td>Jan 2027</td>
</tr>
<tr>
<td><strong>V2 · M4</strong></td>
<td>Process telemetry (Loom) · enforcement · Linear / Figma / GitHub bridge views</td>
<td>H1 2027</td>
</tr>
</tbody>
</table>

<hr class="rule"/>

<p><strong>Critical path:</strong> OSS launch unblocks methodology-as-distribution. V1 unblocks paid revenue. V1.5 unblocks team-tier pricing. V2 unblocks enterprise.</p>

---

<div class="eyebrow">Where we are · today</div>

## What's already on the table.

<div class="columns-3">

<div class="card">
<div class="stat-num">49</div>
<div class="stat-label">commits in <strong>6 days</strong>. Two founders, public repo, pre-fundraise.</div>
</div>

<div class="card">
<div class="stat-num">43</div>
<div class="stat-label">named <strong>operator skills</strong> shipped. Heuristic scan, journey map, premortem, contract readout, slice plan, trust receipt — all sourced.</div>
</div>

<div class="card">
<div class="stat-num">39</div>
<div class="stat-label"><strong>Israeli design leaders</strong> in commit conversations. TLV / Herzliya cluster days lined up for OSS launch.</div>
</div>

</div>

<br>

<div class="columns-3">

<div class="card">
<div class="stat-num">24K</div>
<div class="stat-label">lines of methodology spec + agent definitions in <code>github.com/talsolomon/DubleSlash</code>.</div>
</div>

<div class="card">
<div class="stat-num">16</div>
<div class="stat-label">methodology pages — FLOW spec, fish anatomy, transitions, contracts, HAI-collaboration.</div>
</div>

<div class="card">
<div class="stat-num">9</div>
<div class="stat-label">system-agent specs — capture, redaction, sync, routing, bundles, digest, twin, gate, telemetry.</div>
</div>

</div>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.2rem; margin-top: 1em;">All shipped pre-fundraise. The substrate is in place — what we need is the runtime team to ship V1.</p>

---

<div class="eyebrow">Team</div>

## We've lived this. *Twice*.

<div class="columns">

<div class="card">

<div class="monogram">TS</div>

<h3 style="color: var(--forest); font-size: 0.9rem;">Tal Solomon · co-founder · CEO</h3>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5em;">Product & design executive. Lived two platform shifts end to end — SaaS through 2018, AI through 2026.</p>

<p style="font-size: 0.95em;">Shipped product across the full stack of design, PM, and engineering. Deep in the practitioner network the OSS launch will spread through.</p>

</div>

<div class="card">

<div class="monogram">SM</div>

<h3 style="color: var(--forest); font-size: 0.9rem;">Shenhav Maman · co-founder · Design</h3>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5em;">Senior product designer. Studio-grown, freelance-tested. The reason FLOW is designer-led, not engineer-led.</p>

<p style="font-size: 0.95em;">Drove the visual + interaction system that makes Duble Slash legible to a designer-first audience — the exact wedge that pulls dev + PM along.</p>

</div>

</div>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.15rem; margin-top: 1.2em;">Two founders. Complementary craft. Same thesis. <strong style="color: var(--ink);">Already shipping in public.</strong></p>

---

<div class="eyebrow">The ask</div>

## *$1.5M* seed · 18 months · ships V1 + opens Series A.

<div class="columns-asym">

<div>

<div class="ask-num">$1.5M</div>

<p style="font-size: 1.1em; color: var(--ink); margin: 0;">Seed round. 18 months runway.</p>

<br>

<h3>Use of funds</h3>

<div class="funds-bar">
<div class="funds-seg eng">Engineering · 60%</div>
<div class="funds-seg gtm">GTM · 30%</div>
<div class="funds-seg infra">Infra · 10%</div>
</div>

<p style="font-size: 0.92em;"><strong>Engineering ($900k):</strong> 4 hires — 2 platform engineers (cross-tool capture, sync), 1 designer-engineer, 1 systems engineer (cloud, scale).</p>

<p style="font-size: 0.92em;"><strong>GTM ($450k):</strong> founder-led launch, content production, design partner program, conferences (Config, UXLive, Anthropic Dev Day).</p>

<p style="font-size: 0.92em;"><strong>Infra ($150k):</strong> hosted backend, CDN, observability, security audit before V1.5 paid tier.</p>

</div>

<div>

<h3>Milestones the round buys</h3>

<div class="card-cream" style="background: var(--cream-soft);">

<p><strong>M1 · OSS Launch</strong> · May 2026<br><span style="font-size: 0.9em; color: var(--muted);">Capture + redaction + 4 operators shipping</span></p>

<p><strong>M2 · V1 runtime</strong> · Sep 2026<br><span style="font-size: 0.9em; color: var(--muted);">Cross-tool sync + desktop app + first 10 design partners</span></p>

<p><strong>M3 · V1.5 multiplayer</strong> · Jan 2027<br><span style="font-size: 0.9em; color: var(--muted);">Paid tier launch · 1k seats targeted</span></p>

<p><strong>M4 · Series A trigger</strong> · H1 2027<br><span style="font-size: 0.9em; color: var(--muted);">$300k+ ARR · Anthropic relationship · enterprise pilots</span></p>

</div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.1rem; margin-top: 0.8em;">Every dollar in this round ships product or buys distribution. Zero hand-wave.</p>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">The bet · the vision</div>

# By 2031, this is *how teams run* AI-assisted product work.

<br>

<blockquote style="font-size: 1.7rem; line-height: 1.3;">The way teams describe AI-assisted product work is the way teams will run it.<br><br>The methodology is the public good. The runtime is what we sell.</blockquote>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--lilac); font-size: 1.3rem;">If FLOW becomes how teams describe the work, <strong style="color: #F4ECD7;">Duble Slash becomes how teams run it</strong> — same shape as React → Vercel, GraphQL → Apollo, Kubernetes → every managed K8s vendor. The category creates the platform.</p>

<hr class="rule"/>

<div class="columns">

<div>
<h3 style="color: #B8C9BD;">Tal Solomon · co-founder</h3>
<p style="color: #F4ECD7; font-size: 1.05rem; margin: 0;">talsolomon21@gmail.com</p>
</div>

<div>
<h3 style="color: #B8C9BD;">Code · spec · site</h3>
<p style="color: #F4ECD7; font-size: 1.05rem; margin: 0;">github.com/talsolomon/DubleSlash &nbsp;·&nbsp; dubleslash.ai <span style="color: #B8C9BD; font-size: 0.85em;">(soon)</span></p>
</div>

</div>
