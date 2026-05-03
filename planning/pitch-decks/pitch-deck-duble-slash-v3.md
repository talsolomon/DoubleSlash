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

  /* Storyboard frames */
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
  .funds-seg.eng { background: var(--forest); flex: 35; }
  .funds-seg.gtm { background: var(--forest-soft); flex: 55; }
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

<div class="eyebrow">Duble//Slash · Seed deck · May 2026</div>

# You know where<br>you left off.<br>*AI doesn't.*

<br>

<p class="hero-sub">A <strong>desktop app</strong> that runs in your menu bar — capturing context across every session so when you press <strong>//</strong>, AI already knows the project, the phase, and where you stopped.</p>

<br>

<span class="pill pill-lilac">Context Cloud</span> <span class="pill">Session continuity</span> <span class="pill">Always-on</span> <span class="pill">Local-first</span>

<br><br>

<div class="footer-line"><strong style="color: #F4ECD7;">Tal Solomon</strong> &nbsp;·&nbsp; <strong style="color: #F4ECD7;">Shenhav Lev</strong> &nbsp;·&nbsp; co-founders</div>

---

<div class="eyebrow">The shape of the problem</div>

## Every AI session starts *cold*.

<div class="lede">It doesn't matter which tool, which agent, or how long ago you stopped. Every new session is a blank slate.</div>

<div class="columns">

<div class="card">

<h3>Inside a session</h3>

AI is extraordinary. A brief in five minutes. A spec before lunch. A working prototype the same afternoon.

You're in flow. It knows the context. The work moves.

</div>

<div class="card-forest">

<h3>The moment you start again</h3>

New session. New agent. New day. **Blank slate.**

Re-explain the project. Re-paste the decisions. Re-brief the constraints. Reconstruct what you were trying to do.

**You carry the continuity. AI never does.**

</div>

</div>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.4rem; color: var(--forest); line-height: 1.35;">Every boundary — a new session, a new agent, a colleague picking up your work — is a cold start. The work doesn't carry. Only you do. And you're tired of carrying it.</p>

---

<div class="eyebrow">The precise diagnosis</div>

## This isn't a productivity problem.<br>It's a *continuity* problem.

<div class="columns-asym">

<div>

<blockquote>AI capability isn't the bottleneck. Every tool is powerful. The bottleneck is what happens between sessions.</blockquote>

<br>

<p>The output is fast. The brief, the spec, the prototype — these have never been cheaper to produce.</p>

<p>But the <strong>thread</strong> — the project context, the decisions made, the direction locked — lives only in your head. Every time you hand it to AI, you reconstruct it by hand.</p>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.15rem;">Nobody built the layer that carries the thread for you.</p>

</div>

<div>

<div class="card" style="margin-bottom: 20px;">
<h3>The pattern</h3>
<p><strong>New session</strong> — start from scratch, re-explain everything.</p>
<p><strong>New agent</strong> — same project, same blank slate.</p>
<p><strong>New day</strong> — pick up where you left off? Only if you remember where that was.</p>
<p><strong>New colleague</strong> — hand off your context? You'd need to write it down first.</p>
</div>

<div class="card-forest">
<h3>The cost</h3>
<p>For a 10-person team: <strong>~120 hours/month</strong> reconstructing context that should never have been lost.</p>
<p style="font-size: 0.9em; color: #B8C9BD;">~$180k/yr at $125/hr blended.</p>
</div>

</div>

</div>

---

<div class="eyebrow">The one they haven't named</div>

## The human layer has to be<br>solved *first*.

<div class="columns">

<div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.35rem; line-height: 1.35; color: var(--forest);">YC described the opportunity perfectly: a connective layer that makes a company legible to AI by default. We're building it. But we started somewhere they haven't yet — with the individual worker.</p>

<br>

<p>The integration nightmare — Slack, Linear, GitHub, Notion, custom glue code — exists because nobody solved the human layer first.</p>

<p><strong>You can't build a company-level intelligence loop if every person inside that company is an open loop.</strong></p>

</div>

<div>

<div class="card" style="margin-bottom: 20px;">
<h3>The non-technical majority</h3>
<p>Designers, PMs, creative leads — the majority of knowledge workers. They understand what needs to be done. They cannot maintain AI context at the level required to make that happen.</p>
<p><strong>The gap between their intent and AI's output is continuity. Nobody is closing that gap.</strong></p>
</div>

<div class="card-forest">
<h3>The closed loop</h3>
<p>Solve continuity at the individual level → the team's context stops breaking → the company becomes legible to AI naturally, bottom-up, without any engineering effort.</p>
</div>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">Introducing</div>

# Duble//Slash.

<p class="hero-sub">A desktop app in your menu bar — always present, system-wide. Think Wispr Flow's form factor, applied to <em>context</em> instead of voice.</p>

<br>

<div class="columns">

<div class="card-cream">

<h3>In the background</h3>

Quietly captures what you're working on across projects — decisions, briefs, design reviews, session outputs — and structures them in a personal **Context Cloud**.

You don't manage it. It runs.

</div>

<div class="card-cream">

<h3>When you press `//`</h3>

Wherever you are — any LLM, any agent, any tool — it injects the right context into the prompt automatically.

Project. Phase. What was decided. Where you left off. **AI picks up mid-thought.**

</div>

</div>

<br>

<p style="color: var(--lilac); font-style: italic; font-family: 'Fraunces', Georgia, serif; font-size: 1.15rem; margin: 0;">Tool-agnostic. Always on. Not a wrapper inside one tool — a context layer that lives across all of them.</p>

---

<div class="eyebrow">The product · in motion</div>

## You were mid-brief *yesterday*.<br>Today you just continue.

<div class="storyboard">

<div class="frame">
<div class="step-num">01</div>
<div class="step-title">Yesterday · any session</div>
<p>You're working on a brief in Claude. Deep in it — project locked, decisions made, direction clear.</p>
<p>You close the session. Life happens. You come back tomorrow.</p>
</div>

<div class="arrow">›</div>

<div class="frame">
<div class="step-num">02</div>
<div class="step-title">In the background · always</div>
<p>Duble//Slash captured the session. What was decided. What was open. Where the work stood.</p>
<p><strong>No action needed from you.</strong> It runs.</p>
</div>

<div class="arrow">›</div>

<div class="frame">
<div class="step-num">03</div>
<div class="step-title">Today · new session</div>
<p>You open Claude. New session — blank by default.</p>
<p>You type <code>//</code>. The context is already in the prompt. Project, phase, last decisions, open threads.</p>
<p><strong>You just continue.</strong></p>
</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.3rem; color: var(--forest); margin: 0;">No "where was I?" No re-briefing. No reconstructing. The session picks up mid-thought.</p>

---

<div class="eyebrow">When it becomes a team</div>

## Context doesn't break<br>*between people*.

<div class="columns-asym">

<div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.3rem; color: var(--forest); line-height: 1.35;">When a team adopts this, something shifts. The cold-start problem stops being personal — it stops existing entirely.</p>

<br>

<p>A designer needs a technical review before proceeding. She assigns it to the developer. He opens his agent, presses <code>//</code>, and pulls the project context — without a three-message Slack thread to reconstruct what they're talking about.</p>

<br>

<p>Every brief written through <code>//</code>, every review captured, every session output filed — the company's artifacts become legible to AI naturally. Not because someone built an integration. <strong>Because the workers captured it, one <code>//</code> at a time.</strong></p>

</div>

<div>

<div class="card" style="margin-bottom: 20px;">
<h3>The bottom-up loop</h3>
<p>Individual context continuity → team handoffs that don't break → company artifacts that AI can read without custom integrations.</p>
<p><strong>The closed loop YC described — built from the human layer up.</strong></p>
</div>

<div class="card-forest">
<h3>What changes</h3>
<p>Standups get shorter. Reviews start faster. Onboarding a new person means handing them a <code>//</code>, not a wiki.</p>
<p style="color: #B8C9BD; font-size: 0.9em;">The team moves like one person who remembers everything.</p>
</div>

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

BMAD has a 6-month head start on engineering, none on design or session continuity. Anthropic, Cursor, GitHub haven't claimed the context layer yet. **The slot is empty today.**

</div>

<div class="card">

<h3>3 · The substrate landed</h3>

`AGENTS.md` and `CLAUDE.md` auto-loading across Copilot, Cursor, Claude Code is the right substrate for `//`-injection. **Twelve months ago this took three pastes.**

</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.25rem; color: var(--forest);">The category window is 12–18 months. After that, the context layer either has us, has BMAD, or gets absorbed into a tool.</p>

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

<blockquote style="font-size: 1.4rem; line-height: 1.3;">More output, less shipped value — because AI produces receipts, not continuity.</blockquote>

<br>

<p>AI made the receipt <strong>free.</strong> The brief. The spec. The prototype.</p>

<p>But the receipt is only as good as the context behind it. And context breaks at every session boundary — so teams ship fast and course-correct constantly.</p>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.2rem;">We started generating receipts without maintaining the thread — and wondered why the product wasn't getting better.</p>

</div>

</div>

---

<div class="eyebrow">Competitive landscape</div>

## Tool-bound, *all of them*. We're the context layer *between*.

<table class="matrix">
<thead>
<tr>
<th class="row-header">Competitor</th>
<th>Session continuity</th>
<th>Cross-session memory</th>
<th>Works in any tool</th>
<th>Team handoff</th>
<th>Local-first + redaction</th>
<th>Method layer</th>
<th>Designer-shaped</th>
<th>Open spec</th>
</tr>
</thead>
<tbody>
<tr>
<td class="competitor-name">Claude Projects</td>
<td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">ChatGPT Memory</td>
<td class="partial">◐</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Cursor Rules</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">BMAD</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">—</td><td class="win">✓</td><td class="miss">✗</td><td class="win">✓</td>
</tr>
<tr>
<td class="competitor-name">Mem.ai · Granola</td>
<td class="partial">◐</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td>
</tr>
<tr>
<td class="competitor-name">Notion AI · Linear AI</td>
<td class="miss">✗</td><td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td><td class="miss">✗</td><td class="partial">◐</td><td class="miss">✗</td>
</tr>
<tr class="us">
<td class="competitor-name">Duble//Slash</td>
<td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td><td class="win">✓</td>
</tr>
</tbody>
</table>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.15rem; color: var(--forest); margin: 0;">Claude, ChatGPT, Cursor each defend a tool. <strong style="color: var(--ink);">Our position is the one none of them can take without giving up their wedge.</strong></p>

---

<div class="eyebrow">Market shape</div>

## *84% of devs* use AI. None of them have session continuity.

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
Israeli design leaders + 30 SMB product teams (Tal's network). Land via methodology; expand via continuity layer.
</div>

<div>
<h3>Wedge</h3>
Designers — feel the session-reset pain hardest, no continuity-shaped tool today. Pull dev + PM along.
</div>

<div>
<h3>Adjacent</h3>
PMs and technical leads running AI-assisted product work. The DORA / METR data is exactly their problem.
</div>

</div>

---

<div class="eyebrow">Pricing</div>

## Open *forever*. Continuity sold as a single tier.

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

Session continuity. Context Cloud. Desktop app. Trust receipts. Redaction. Single-machine macOS menu-bar client.

Designers, ICs, solo PMs.

</div>

<div class="card">

<span class="pill pill-forest">Recommended</span>

<h3 style="margin-top: 0.6em;">Team</h3>

<div class="stat-num">$12 / seat / mo</div>

Everything in Individual + multiplayer handoffs, daily digest, per-team context policy, onboarding, analytics.

3-seat minimum.

</div>

</div>

<p style="text-align: center; color: var(--muted); margin-top: 1em; font-style: italic; font-size: 0.9em;">The continuity layer is worth multiple seats of Notion or Linear-equivalent. We undercut intentionally during the methodology-as-distribution phase.</p>

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
<td>4 operators · <code>npx</code> install · session capture · macOS menu-bar · 4 launch articles</td>
<td>May 2026</td>
</tr>
<tr>
<td><strong>V1 · M2</strong></td>
<td>Context Cloud · <code>//</code> injection · desktop app · context onboarding · team handoffs · trust receipts</td>
<td>Sep 2026</td>
</tr>
<tr>
<td><strong>V1.5 · M3</strong></td>
<td>Multiplayer context · daily digest · per-team context policy · paid tier launch</td>
<td>Jan 2027</td>
</tr>
<tr>
<td><strong>V2 · M4</strong></td>
<td>Process telemetry · enforcement · Linear / Figma / GitHub bridge views</td>
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
<div class="stat-label">methodology pages — Fish spec, anatomy, transitions, contracts, HAI-collaboration.</div>
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

<div class="monogram">SL</div>

<h3 style="color: var(--forest); font-size: 0.9rem;">Shenhav Lev · co-founder · CPDO</h3>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5em;">Senior product designer. Studio-grown, freelance-tested. The reason this is designer-led, not engineer-led.</p>

<p style="font-size: 0.95em;">Drove the visual + interaction system that makes Duble//Slash legible to a designer-first audience — the exact wedge that pulls dev + PM along.</p>

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
<div class="funds-seg eng">Engineering · 35%</div>
<div class="funds-seg gtm">GTM · 55%</div>
<div class="funds-seg infra">Infra · 10%</div>
</div>

<p style="font-size: 0.92em;"><strong>Engineering ($525k):</strong> 2 core hires — 1 platform engineer (session capture, context injection), 1 systems engineer (cloud, sync).</p>

<p style="font-size: 0.92em;"><strong>GTM ($825k):</strong> founder-led launch, content production, design + dev partner programs, conferences (Config, UXLive, Anthropic Dev Day), community seeding.</p>

<p style="font-size: 0.92em;"><strong>Infra ($150k):</strong> hosted backend, CDN, observability, security audit before V1.5 paid tier.</p>

</div>

<div>

<h3>Milestones the round buys</h3>

<div class="card-cream" style="background: var(--cream-soft);">

<p><strong>M1 · OSS Launch</strong> · May 2026<br><span style="font-size: 0.9em; color: var(--muted);">Session capture + 4 operators shipping</span></p>

<p><strong>M2 · V1 runtime</strong> · Sep 2026<br><span style="font-size: 0.9em; color: var(--muted);"><code>//</code> injection + Context Cloud + first 10 design partners</span></p>

<p><strong>M3 · V1.5 multiplayer</strong> · Jan 2027<br><span style="font-size: 0.9em; color: var(--muted);">Paid tier launch · 1k seats targeted</span></p>

<p><strong>M4 · Series A trigger</strong> · H1 2027<br><span style="font-size: 0.9em; color: var(--muted);">$300k+ ARR · Anthropic relationship · enterprise pilots</span></p>

</div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.1rem; margin-top: 0.8em;">Every dollar in this round ships product or buys distribution. Zero hand-wave.</p>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">The bet · the vision</div>

# By 2031, this is *how teams run* AI-assisted work.

<br>

<blockquote style="font-size: 1.6rem; line-height: 1.3;">The context layer is the most valuable real estate of the next decade.<br><br>The methodology is the public good. The continuity layer is what we sell.</blockquote>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--lilac); font-size: 1.3rem;">When a team's context doesn't break, the company itself becomes legible to AI — naturally, bottom-up, without any engineering effort. Same shape as React → Vercel. The category creates the platform.</p>

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
