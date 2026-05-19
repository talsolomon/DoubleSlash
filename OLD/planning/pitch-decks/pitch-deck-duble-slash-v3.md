---
marp: true
theme: default
paginate: true
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

  section.forest { background: linear-gradient(160deg, #091710 0%, #112016 20%, #1A3324 58%, #1E3B2C 100%); color: #F4ECD7; }

  section.forest::before {
    content: '//';
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 700;
    font-size: 340px;
    color: rgba(255,255,255,0.028);
    position: absolute;
    right: -30px;
    bottom: -55px;
    line-height: 0.88;
    letter-spacing: -0.1em;
    pointer-events: none;
    user-select: none;
  }

  h1, h2 {
    font-family: 'Fraunces', 'Tiempos', Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
    margin: 0 0 0.35em 0;
  }
  h1 { font-size: 4.9rem; line-height: 0.97; font-weight: 500; }
  h2 { font-size: 2.55rem; line-height: 1.08; font-weight: 500; margin-bottom: 0.4em; }
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

  .citation {
    display: inline-block;
    font-size: 0.72em;
    font-weight: 500;
    color: var(--muted);
    background: var(--cream-edge);
    border-radius: 4px;
    padding: 1px 7px 2px;
    letter-spacing: 0.02em;
    vertical-align: middle;
    margin-left: 4px;
    line-height: 1.7;
  }
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
    font-size: 1.7rem;
    line-height: 1.28;
    color: var(--forest);
    font-weight: 400;
  }
  blockquote p { color: var(--forest); margin: 0; }

  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: stretch; }
  .columns-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; align-items: stretch; align-content: stretch; }
  .columns-asym { display: grid; grid-template-columns: 1.25fr 1fr; gap: 52px; align-items: stretch; }

  .card { background: #FFFFFF; border: 1px solid rgba(224,213,187,0.75); border-radius: 18px; padding: 24px 26px; box-shadow: 0 2px 18px rgba(14,14,10,0.07), 0 1px 3px rgba(14,14,10,0.05); }
  .card-cream { background: #FFFFFF; border: 1px solid rgba(224,213,187,0.75); border-radius: 18px; padding: 24px 26px; box-shadow: 0 2px 18px rgba(14,14,10,0.07), 0 1px 3px rgba(14,14,10,0.05); }
  .card-forest { background: var(--forest); color: #F4ECD7; border-radius: 18px; padding: 24px 26px; box-shadow: 0 4px 28px rgba(0,0,0,0.28); }
  .card-forest h3 { color: #B8C9BD; }
  .card-forest p, .card-forest li { color: #EBE3CD; }
  .card-forest strong { color: #F4ECD7; }
  .card-forest code { background: var(--forest-deep); color: var(--lilac); border-color: var(--forest-soft); }

  .compact-cards { display: flex; flex-direction: column; gap: 12px; }
  .compact-cards .card, .compact-cards .card-forest { padding: 14px 20px; }
  .compact-cards .card p, .compact-cards .card-forest p { margin-bottom: 0.4em; }
  .compact-cards h3 { margin-bottom: 0.3em; }
  .card-forest-flush {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: -80px;
    padding-bottom: 94px;
    flex: 1;
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }

  .pill {
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid rgba(224,213,187,0.8);
    border-radius: 999px;
    padding: 5px 14px;
    font-size: 0.76em;
    font-weight: 600;
    color: var(--ink-soft);
    margin: 2px 4px 4px 0;
    box-shadow: 0 1px 4px rgba(14,14,10,0.06);
    letter-spacing: 0.01em;
  }
  .pill-forest { background: var(--forest); color: #EBE3CD; border-color: var(--forest-deep); box-shadow: 0 2px 8px rgba(0,0,0,0.18); }
  .pill-lilac { background: rgba(221,201,244,0.85); border-color: var(--lilac-deep); color: var(--forest-deep); font-weight: 700; }
  .pill-sage { background: #DDE3CC; border-color: var(--sage); color: var(--forest); }

  .stat-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 3.4rem;
    font-weight: 500;
    line-height: 1;
    color: var(--forest);
    letter-spacing: -0.04em;
    margin-bottom: 0.25em;
  }
  .stat-label { color: var(--muted); font-size: 0.85em; line-height: 1.45; }
  .price-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 2.2rem;
    font-weight: 500;
    line-height: 1.1;
    color: var(--forest);
    letter-spacing: -0.03em;
    margin-bottom: 0.3em;
  }

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
  section.forest .step-title { color: var(--lilac); }
  section.forest .step-num { color: var(--lilac); }

  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 2px;
    background: currentColor;
    opacity: 0.5;
    flex-shrink: 0;
  }
  section.forest .eyebrow { color: #C4B99A; }

  section.section-break {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 72px;
  }
  .section-label {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 3.6rem;
    font-weight: 300;
    color: #F4ECD7;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }
  .section-label::before {
    content: '';
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #C4B99A;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 1em;
  }

  section::after {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--ink-soft);
    content: attr(data-marpit-pagination) " / " attr(data-marpit-pagination-total);
    position: absolute;
    bottom: 28px;
    right: 72px;
    letter-spacing: 0.04em;
  }
  section.forest::after { color: #D4CAAF; }
  .lede {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 1.55rem;
    line-height: 1.32;
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
  .frame-bare {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
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
  .matrix thead tr { background: rgba(244,236,215,0.6); }
  .matrix th { font-size: 0.62em; padding: 10px 8px; text-align: center; border-bottom: 2px solid var(--cream-edge); }
  .matrix th.row-header { text-align: left; padding-left: 14px; }
  .matrix td { padding: 10px 8px; text-align: center; font-family: 'Fraunces', Georgia, serif; font-size: 1.2em; line-height: 1; }
  .matrix td.competitor-name { text-align: left; padding-left: 14px; font-family: 'Inter', sans-serif; font-size: 0.88em; }
  .matrix tr.us { background: linear-gradient(90deg, rgba(221,201,244,0.58) 0%, rgba(221,201,244,0.26) 65%, rgba(221,201,244,0.08) 100%); }
  .matrix tr.us td { border-top: 1.5px solid rgba(182,158,224,0.6); border-bottom: 1.5px solid rgba(182,158,224,0.6); padding-top: 14px; padding-bottom: 14px; }
  .matrix tr.us td:first-child { border-left: 4px solid var(--lilac-deep); padding-left: 12px; }
  .matrix tr.us td.competitor-name { font-weight: 700; font-size: 0.95em; color: var(--forest-deep); letter-spacing: -0.01em; }
  .win { color: var(--forest-deep); font-weight: 700; font-size: 1.25em; }
  .partial { color: var(--partial); font-size: 1.15em; }
  .miss { color: #C0B89D; font-size: 0.9em; opacity: 0.7; }

  /* Pain → payoff table */
  .pain-table { font-size: 0.92em; }
  .pain-table td { padding: 12px 14px; vertical-align: top; }
  .pain-table .pain { font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.05em; }
  .pain-table .cost { color: var(--terra); font-weight: 600; font-family: 'Fraunces', Georgia, serif; }

  /* Team headshot */
  .team-photo {
    width: 110px !important;
    height: 110px !important;
    border-radius: 999px !important;
    object-fit: cover !important;
    object-position: center top !important;
    margin-bottom: 0.6em !important;
    display: block !important;
  }

  /* Use of funds bar */
  .funds-bar { display: flex; height: 64px; border-radius: 12px; overflow: hidden; margin: 0.6em 0 0.5em 0; }
  .funds-seg { display: flex; align-items: center; justify-content: center; color: #F4ECD7; font-weight: 600; font-size: 0.9em; }
  .funds-seg.eng { background: var(--forest); flex: 35; }
  .funds-seg.gtm { background: var(--forest-soft); flex: 50; }
  .funds-seg.infra { background: var(--lilac-deep); color: var(--forest-deep); flex: 15; }
  .funds-cards { display: grid; grid-template-columns: 9fr 13fr 3fr; gap: 8px; margin-bottom: 1em; }
  .funds-card { border-radius: 12px; padding: 13px 16px; }
  .funds-card .funds-amount { font-family: 'Fraunces', Georgia, serif; font-size: 1.55rem; font-weight: 500; line-height: 1; margin-bottom: 4px; }
  .funds-card .funds-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 6px; }
  .funds-card .funds-desc { font-size: 0.73rem; line-height: 1.45; }
  .funds-card.eng { background: var(--forest); color: #EBE3CD; }
  .funds-card.eng .funds-amount { color: #F4ECD7; }
  .funds-card.eng .funds-label { color: #8BAD96; }
  .funds-card.gtm { background: var(--forest-soft); color: #EBE3CD; }
  .funds-card.gtm .funds-amount { color: #F4ECD7; }
  .funds-card.gtm .funds-label { color: #8BAD96; }
  .funds-card.infra { background: var(--lilac-deep); color: var(--forest-deep); }
  .funds-card.infra .funds-amount { color: var(--forest-deep); }
  .funds-card.infra .funds-label { color: var(--forest); }

  /* Product story slides */
  .product-story {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 44px;
    margin-top: 0.5em;
    align-items: center;
  }
  .product-story img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 6px 40px rgba(0,0,0,0.5);
    display: block;
  }
  .product-story h2 {
    font-size: 1.85rem;
    margin-bottom: 0.3em;
  }

  /* Big ask number */
  .ask-num {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 6.2rem;
    font-weight: 500;
    line-height: 0.95;
    color: var(--forest);
    letter-spacing: -0.05em;
    margin: 0.15em 0 0.2em 0;
  }
  section.forest .ask-num { color: var(--lilac); }

  /* === Visual Roadmap Timeline === */
  .rm-wrap { position: relative; margin: 1.6em 0 0.8em 0; }
  .rm-nodes-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }
  .rm-nodes-row::before {
    content: '';
    position: absolute;
    top: 19px;
    left: 12.5%;
    right: 12.5%;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--forest) 0%,
      var(--forest) 5%,
      rgba(30,59,44,0.22) 20%,
      var(--cream-edge) 32%,
      var(--cream-edge) 100%
    );
    z-index: 0;
  }
  .rm-node { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; }
  .rm-dot-wrap { position: relative; z-index: 1; }
  .rm-dot {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: var(--cream);
    border: 2px solid var(--cream-edge);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', Georgia, serif;
    font-size: 0.88em;
    color: var(--muted);
  }
  .rm-dot-now {
    background: var(--forest);
    border-color: var(--forest);
    box-shadow: 0 0 0 7px rgba(30,59,44,0.13), 0 0 0 15px rgba(30,59,44,0.05);
  }
  .rm-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 8px;
    margin-top: 14px;
  }
  .rm-now-badge {
    background: var(--forest);
    color: #F4ECD7;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 1px 7px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .rm-m-label {
    font-size: 0.66em;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin-bottom: 5px;
  }
  .rm-node.rm-active .rm-m-label { color: var(--forest); }
  .rm-title {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-size: 1.05em;
    line-height: 1.25;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .rm-node.rm-active .rm-title { color: var(--forest); font-weight: 600; font-style: normal; }
  .rm-node.rm-far .rm-title { color: var(--muted); }
  .rm-date {
    font-size: 0.67em;
    font-weight: 700;
    color: var(--sage);
    letter-spacing: 0.07em;
    margin-bottom: 10px;
  }
  .rm-node.rm-active .rm-date { color: var(--forest); }
  .rm-feats {
    font-size: 0.69em;
    color: var(--muted);
    line-height: 1.6;
    text-align: center;
  }
  .rm-node.rm-active .rm-feats { color: var(--ink-soft); }
  .rm-node.rm-far { opacity: 0.5; }
  .rm-critical {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-size: 0.88em;
    color: var(--muted);
    line-height: 1.55;
    margin-top: 0.5em;
    margin-bottom: 0;
  }
  .rm-critical strong {
    font-style: normal;
    font-family: 'Inter', sans-serif;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink);
  }
---

<!-- _class: forest -->

<div class="eyebrow">Duble//Slash · Seed deck · May 2026</div>

<h1><span style="color:var(--lilac); font-weight:700; opacity:0.92;">// </span>You know where<br>you left off.<br><em>AI doesn't.</em></h1>

<br>

<p class="hero-sub">A <strong>desktop app</strong> that runs in your menu bar  -  capturing context across every session so when you press <strong>//</strong>, AI already knows the project, the phase, and where you stopped.</p>

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


</div>

</div>

<br>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.4rem; color: var(--forest); line-height: 1.35;">Every boundary is a cold start: new session, new agent, a colleague picking up your work. The work doesn't carry. Only you do. And you're tired of carrying it.</p>

---

<div class="eyebrow">The precise diagnosis</div>

## This isn't a productivity problem.<br>It's a *continuity* problem.

<div class="columns-asym">

<div>

<blockquote>AI capability isn't the bottleneck. Every tool is powerful. The bottleneck is what happens between sessions.</blockquote>

<br>

<p>The output is fast. The brief, the spec, the prototype: they have never been cheaper to produce.</p>

<p>But the <strong>thread</strong> (the project context, the decisions made, the direction locked) lives only in your head. Every time you hand it to AI, you reconstruct it by hand.</p>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.15rem;">Nobody built the layer that carries the thread for you.</p>

</div>

<div class="compact-cards">

<div class="card">
<h3>The pattern</h3>
<p><strong>New session:</strong> start from scratch, re-explain everything.</p>
<p><strong>New agent:</strong> same project, same blank slate.</p>
<p><strong>New day:</strong> pick up where you left off? Only if you remember where that was.</p>
<p><strong>New colleague:</strong> hand off your context? You'd need to write it down first.</p>
</div>

<div class="card-forest card-forest-flush">
<h3>The cost</h3>
<p>Every session, every handoff, every new colleague: each one costs the time to reconstruct what was already known. For a team, it compounds.</p>
</div>

</div>

</div>

---

<div class="eyebrow">The one they haven't named</div>

## The human layer has to be<br>solved *first*.

<div class="columns">

<div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.35rem; line-height: 1.35; color: var(--forest);">"The connective layer that makes a company legible to AI by default. That's the real opportunity." We're building it. Starting where nobody has: with the non-technical worker who can't maintain AI context manually.</p>

<br>

<p>The integration nightmare (Slack, Linear, GitHub, Notion, custom glue code) exists because nobody solved the human layer first.</p>

<p><strong>You can't build a company-level intelligence loop if every person inside that company is an open loop.</strong></p>

</div>

<div style="display:flex; flex-direction:column;">

<div class="card" style="margin-bottom: 20px;">
<h3>The non-technical majority</h3>
<p>Designers, PMs, creative leads: the majority of knowledge workers. They understand what needs to be done. They cannot maintain AI context at the level required to make that happen.</p>
<p><strong>The gap between their intent and AI's output is continuity. Nobody is closing that gap.</strong></p>
</div>

<div class="card-forest card-forest-flush">
<h3>The project-level intelligence loop</h3>
<p>Solve continuity at the individual level → handoffs stop breaking → the company builds a project-level intelligence loop, bottom-up, without engineering effort.</p>
</div>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">Introducing</div>

# Duble//Slash.

<p class="hero-sub">A desktop app in your menu bar  -  always present, system-wide. Think Wispr Flow's form factor, applied to <em>context</em> instead of voice.</p>

<div class="columns">

<div class="card-cream">

<h3>In the background</h3>

Quietly captures what you're working on across projects (decisions, briefs, design reviews, session outputs) and structures them in a personal **Context Cloud**.

You don't manage it. It runs.

</div>

<div class="card-cream">

<h3>When you press `//`</h3>

Wherever you are (any LLM, any agent, any tool) it injects the right context into the prompt automatically.

Project. Phase. What was decided. Where you left off. **AI picks up mid-thought.**

</div>

</div>

<br>

<p style="color: var(--lilac); font-style: italic; font-family: 'Fraunces', Georgia, serif; font-size: 1.15rem; margin: 0;">Tool-agnostic. Always on. Not a wrapper inside one tool  -  a context layer that lives across all of them.</p>

---

<!-- _class: forest section-break -->

<div class="section-label">The user flow</div>

---

<!-- _class: forest -->

<div class="eyebrow">The pill · in action</div>

<div class="product-story">
<img src="assets/duble1.png">
<div>
<h2>Session pickup.</h2>
<p class="lede">Context retrieved before you type a word.</p>
<p>Project state, open decisions, last position: all loaded automatically. You open the tool and the work is already there.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">The pill · in action</div>

<div class="product-story">
<img src="assets/duble2.png">
<div>
<h2>Task surface.</h2>
<p class="lede">Open work surfaced by project and priority.</p>
<p>No digging. No thread archaeology. The right tasks appear in the right order, across every project you're running.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">The pill · in action</div>

<div class="product-story">
<img src="assets/duble3.png">
<div>
<h2>Full context on demand.</h2>
<p class="lede">Select a task. The brief is already there.</p>
<p>One tap to hand it to AI and move. The session starts where the last one ended. AI doesn't start from scratch anymore.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">// in action</div>

<div class="product-story">
<img src="assets/duble4.png">
<div>
<h2>One trigger.</h2>
<p class="lede">In any tool. Any agent. Without copy-pasting a single line of context.</p>
<p>Type <code>//</code> and the right context lands in the prompt automatically  -  project, phase, last decision, open threads. The session starts where the last one ended. AI doesn't start from scratch anymore.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">The context cloud · building</div>

<div class="product-story">
<img src="assets/nodemap1.png">
<div>
<h2>Empty canvas.</h2>
<p class="lede">First contact. The map begins to form.</p>
<p>Sparse at first. A direction, a few signals. Every session adds structure. The context cloud starts building from day one.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">The context cloud · building</div>

<div class="product-story">
<img src="assets/nodemap2.png">
<div>
<h2>Living project map.</h2>
<p class="lede">Every decision adds a node.</p>
<p>Briefs, reviews, handoffs, captured and connected automatically. The map grows without you managing it.</p>
</div>
</div>

---

<!-- _class: forest -->

<div class="eyebrow">The context cloud · building</div>

<div class="product-story">
<img src="assets/snapshot.png">
<div>
<h2>Team layer.</h2>
<p class="lede">Human work and agent work, side by side.</p>
<p>Tasks route to the right person or agent. Everyone sees the same map. Nothing falls through the cracks.</p>
</div>
</div>

---

<div class="eyebrow">The product · in motion</div>

## You were mid-brief *yesterday*.<br>Today you just continue.

<div class="storyboard">

<div class="frame">
<div class="step-num">01</div>
<div class="step-title">Yesterday · any session</div>
<p>You're working on a brief in Claude. Deep in it: project locked, decisions made, direction clear.</p>
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
<p>You open Claude. New session, blank by default.</p>
<p>You type <code>//</code>. The context is already in the prompt. Project, phase, last decisions, open threads.</p>
<p><strong>You just continue.</strong></p>
</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.3rem; color: var(--forest); margin: 0;">No "where was I?" No re-briefing. No reconstructing. The session picks up mid-thought.</p>

---

<div class="eyebrow">When it becomes a <span style="font-family:'Fraunces',Georgia,serif; font-weight:800; color:var(--forest); letter-spacing:0.05em;">team</span></div>

## Context doesn't break<br>*between people*.

<p style="font-family:'Fraunces',Georgia,serif; font-style:italic; font-size:1.15rem; color:var(--forest); line-height:1.35; margin-bottom:32px;">When a team adopts this, the cold-start problem stops being personal. It stops existing entirely.</p>

<div style="display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:0; align-items:center;">

<div style="background:#fff; border:1px solid var(--cream-edge); border-radius:18px; padding:26px 22px; text-align:center; box-shadow:0 2px 12px rgba(14,14,10,0.06);">
<div style="font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.14em; color:var(--muted); margin-bottom:10px;">01 · Individual</div>
<div style="font-family:'Fraunces',serif; font-size:1.3rem; color:var(--forest); line-height:1.2; margin-bottom:10px;">Personal context<br>continuity</div>
<div style="font-size:0.8rem; color:var(--muted); line-height:1.5;">Every session picks up<br>where it left off</div>
</div>

<div style="display:flex; flex-direction:column; align-items:center; padding:0 18px; gap:5px;">
<code>//</code>
<div style="font-size:1.3rem; color:var(--cream-edge);">→</div>
</div>

<div style="background:#fff; border:1px solid var(--cream-edge); border-radius:18px; padding:26px 22px; text-align:center; box-shadow:0 2px 12px rgba(14,14,10,0.06);">
<div style="font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.14em; color:var(--muted); margin-bottom:10px;">02 · Team</div>
<div style="font-family:'Fraunces',serif; font-size:1.3rem; color:var(--forest); line-height:1.2; margin-bottom:10px;">Handoffs that<br>don't break</div>
<div style="font-size:0.8rem; color:var(--muted); line-height:1.5;">No Slack thread.<br>No re-briefing. Ever.</div>
</div>

<div style="display:flex; flex-direction:column; align-items:center; padding:0 18px; gap:5px;">
<code>//</code>
<div style="font-size:1.3rem; color:var(--cream-edge);">→</div>
</div>

<div style="background:var(--forest); border-radius:18px; padding:26px 22px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.22);">
<div style="font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.14em; color:#8BAD96; margin-bottom:10px;">03 · Company</div>
<div style="font-family:'Fraunces',serif; font-size:1.3rem; color:#F4ECD7; line-height:1.2; margin-bottom:10px;">Artifacts AI reads<br>natively</div>
<div style="font-size:0.8rem; color:#B8C9BD; line-height:1.5;">Built bottom-up.<br>No integrations required.</div>
</div>

</div>

<p style="text-align:center; margin-top:24px; font-size:0.84rem; color:var(--muted);">The project-level intelligence loop, built from the human layer up, one <code>//</code> at a time.</p>

---

<div class="eyebrow">// in the wild · tech teams</div>

## The team moves like<br>*one person who remembers everything*.

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.05rem; color: var(--forest); margin: 0 0 1em 0; line-height: 1.35;">Six moments where having context changes how the work actually happens — not just how fast it goes.</p>

<div class="compact-cards">

<div class="columns-3">

<div class="card">
<h3>Standup digest</h3>
<p>One agent command surfaces what shipped, what's blocked, what needs a decision. <strong>Two minutes, not twenty.</strong></p>
</div>

<div class="card">
<h3>PR handoff</h3>
<p>Next dev types <code>//</code>. Context loads: the approach, what was tried, why this path. <strong>No three-message Slack reconstruction.</strong></p>
</div>

<div class="card">
<h3>Design → dev review</h3>
<p>The developer opens <code>//</code> and starts with everything the designer knew. <strong>Reviews start faster.</strong></p>
</div>

</div>

<div class="columns-3" style="margin-top: 10px;">

<div class="card">
<h3>Sprint planning</h3>
<p>Every open thread and unresolved decision surfaces before the call. <strong>The context cloud is the prep doc. No one had to write it.</strong></p>
</div>

<div class="card">
<h3>Async handoff</h3>
<p>West Coast closes the session. East Coast types <code>//</code> and picks up mid-thought. <strong>Timezone gaps stop being context gaps.</strong></p>
</div>

<div class="card-forest">
<h3>New hire onboarding</h3>
<p style="color:#EBE3CD;">They type <code>//</code> and get the brief, the decisions made, the current phase. <strong>Full project context, day one.</strong></p>
</div>

</div>

</div>

---

<div class="eyebrow">The moat · methodology + agents</div>

## *78 skills. 8 agents.*<br>Built by design leaders, *for design leaders.*

<div class="columns-asym" style="margin-top:0.55em; gap:40px;">

<div>

<p class="callout" style="font-size:1.1rem;">Double Diamond, rebuilt for Human-AI collaboration. Four phases, four agent archetypes, 78 skill contracts. Every method specifies exactly how AI shows up.</p>

<p><strong>Four archetypes.</strong> Nemo (Discover) · Tuna (Define) · Salmon (Develop) · Willy (Deliver). Each runs at the intensity that phase deserves. No PRD ceremony for a tooltip fix.</p>

<p><strong>Four HAI collaboration modes.</strong> Solo · Co-pilot · Prepare-and-synthesize · Stay out. The method specifies which. The agent is bound to the contract, not the vibe.</p>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 0.98rem; line-height: 1.4;">No one else trained agents on a practitioner design methodology. They have chatbots with a design theme. We have a methodology agents can actually run.</p>

</div>

<div style="display:flex; flex-direction:column; gap:9px;">

<div style="background:var(--ink-soft); color:#F4ECD7; border-radius:13px; padding:14px 16px;">
<div style="font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.18em; color:#B8C9BD; margin-bottom:7px;">Tier 0 · Orchestration</div>
<div style="display:flex; gap:9px; align-items:center;">
<span style="background:rgba(255,255,255,0.13); border-radius:7px; padding:4px 13px; font-weight:600; font-size:0.84em;">Apex</span>
<span style="background:rgba(255,255,255,0.13); border-radius:7px; padding:4px 13px; font-weight:600; font-size:0.84em;">Guard</span>
<span style="margin-left:auto; font-size:0.72em; color:#9BA89F; font-style:italic;">routes · protects</span>
</div>
</div>

<div style="background:var(--forest); color:#F4ECD7; border-radius:13px; padding:14px 16px;">
<div style="font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.18em; color:#8BAD96; margin-bottom:7px;">Tier 1 · Context workers</div>
<div style="display:flex; gap:9px; align-items:center;">
<span style="background:rgba(255,255,255,0.13); border-radius:7px; padding:4px 13px; font-weight:600; font-size:0.84em;">Echo</span>
<span style="background:rgba(255,255,255,0.13); border-radius:7px; padding:4px 13px; font-weight:600; font-size:0.84em;">Prism</span>
<span style="margin-left:auto; font-size:0.72em; color:#8BAD96; font-style:italic;">capture · distill</span>
</div>
</div>

<div style="background:#FFFFFF; border:1px solid var(--cream-edge); border-radius:13px; padding:14px 16px; box-shadow:0 2px 10px rgba(14,14,10,0.06);">
<div style="font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.18em; color:var(--muted); margin-bottom:9px;">Tier 2 · Phase operators · invoked via <code style="font-size:0.82em; background:var(--cream-soft); border:1px solid var(--cream-edge); padding:0 4px; border-radius:3px;">//</code></div>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:7px;">
<div style="background:var(--cream-soft); border:1px solid var(--cream-edge); border-radius:8px; padding:6px 11px;">
<div style="font-weight:700; font-size:0.83em; color:var(--ink);">Dora</div>
<div style="font-size:0.7em; color:var(--muted);">Explorer · Discover</div>
</div>
<div style="background:var(--cream-soft); border:1px solid var(--cream-edge); border-radius:8px; padding:6px 11px;">
<div style="font-weight:700; font-size:0.83em; color:var(--ink);">Sol</div>
<div style="font-size:0.7em; color:var(--muted);">Solidifier · Define</div>
</div>
<div style="background:var(--cream-soft); border:1px solid var(--cream-edge); border-radius:8px; padding:6px 11px;">
<div style="font-weight:700; font-size:0.83em; color:var(--ink);">Bran</div>
<div style="font-size:0.7em; color:var(--muted);">Builder · Develop</div>
</div>
<div style="background:var(--cream-soft); border:1px solid var(--cream-edge); border-radius:8px; padding:6px 11px;">
<div style="font-weight:700; font-size:0.83em; color:var(--ink);">May</div>
<div style="font-size:0.7em; color:var(--muted);">Shipper · Deliver</div>
</div>
</div>
</div>

<p style="font-size:0.75em; color:var(--muted); text-align:center; margin:2px 0 0 0;">Published 2024 · <strong style="color:var(--ink);">talsolomonux.com</strong></p>

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

Every player builds for technical users, inside a single tool. No one has built the **over-layer**: tool-agnostic, working across any LLM, any agent, any workflow, for the non-technical majority. **That slot is still empty.**

</div>

<div class="card">

<h3>3 · The substrate landed</h3>

`AGENTS.md` and `CLAUDE.md` auto-loading across Copilot, Cursor, Claude Code is the right substrate for `//`-injection. **Twelve months ago this took three pastes.**

</div>

</div>

<br>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.25rem; color: var(--forest);">The category window is 4–5 months. After that, the context layer either has us, has BMAD, or gets absorbed into a tool.</p>

---

<div class="eyebrow">The adoption gap · why it exists</div>

## They tried AI for design work.<br>*68% opted out.*

<div class="columns-3">

<div class="card">
<div class="stat-num">68%</div>
<div class="stat-label">of designers <strong>don't trust or use AI for core design work</strong>  -  even at companies that have fully adopted it. <span class="citation">NNG 2025</span></div>
</div>

<div class="card">
<div class="stat-num">2×</div>
<div class="stat-label">Developers adopt AI at <strong>twice the rate of designers</strong>  -  59% vs 31% for core tasks. The non-technical gap isn't closing. <span class="citation">Worklytics 2025</span></div>
</div>

<div class="card">
<div class="stat-num">40%</div>
<div class="stat-label">of productive time consumed by <strong>context switching</strong>. 1,200 app-switches daily. 23 minutes to regain focus after each one. <span class="citation">APA / SpeakWise 2025</span></div>
</div>

</div>

<hr class="rule"/>

<div class="columns-3">

<div>
<h3>Why AI fails designers</h3>
You can't prompt-engineer a visual brief. Brand, flow, constraints, decisions - none of it lives in the AI session. Every prompt starts cold. <strong>The context layer is exactly what's missing.</strong>
</div>

<div>
<h3>Beachhead</h3>
13 Israeli design studios (KIDO, Firma, Hello Design, Nmore + 9 more) · 8-week pilot · TLV + Herzliya cluster. Land via methodology; expand via continuity layer.
</div>

<div>
<h3>Wedge → Adjacent</h3>
Designers pull dev + PM along. Solve continuity for one discipline and the whole team adopts. The context layer grows with the org.
</div>

</div>

---

<div class="eyebrow">Pricing</div>

## Always free for individuals. *Continuity* sold as a team capability.

<div class="columns-3">

<div class="card">

<h3>Free</h3>

<div class="price-num">$0</div>

Full agent suite. Methodology spec. Session capture. Desktop app. Trust receipts. Forever free for individuals.

<br>

<code>npx @dubleslash/install</code>

</div>

<div class="card">

<h3>Team</h3>

<div class="price-num">$19 / seat / mo</div>

Multiplayer context. Team handoffs. Daily digest. Per-team context policy. Onboarding. Analytics.

3-seat minimum.

</div>

<div class="card">

<h3>Enterprise</h3>

<div class="price-num">Custom</div>

Org-level context policy. SSO. Audit logs. Dedicated onboarding. Anthropic partnership pilots.

<br>

<span style="font-size: 0.9em; color: var(--muted);">Contact us.</span>

</div>

</div>

<p style="text-align: center; color: var(--muted); margin-top: 1em; font-style: italic; font-size: 0.9em;">The continuity layer is worth multiple seats of Notion or Linear-equivalent. We undercut intentionally during the methodology-as-distribution phase.</p>

---

<div class="eyebrow">Roadmap</div>

## // Agents Launch → V1 → V1.5 → V2.

<div class="rm-wrap">
<div class="rm-nodes-row">

<div class="rm-node rm-active">
<div class="rm-dot-wrap"><div class="rm-dot rm-dot-now"><svg width="17" height="13" viewBox="0 0 17 13" fill="none"><path d="M1.5 6.5L6 11L15.5 1.5" stroke="#F4ECD7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
<div class="rm-content">
<div class="rm-m-label"><span class="rm-now-badge">now</span> M1</div>
<div class="rm-title">// Agents Launch</div>
<div class="rm-date">May 2026</div>
<div class="rm-feats">8 agents · 3 tiers<br>npx install · macOS<br>session capture</div>
</div>
</div>

<div class="rm-node">
<div class="rm-dot-wrap"><div class="rm-dot">2</div></div>
<div class="rm-content">
<div class="rm-m-label">M2</div>
<div class="rm-title">V1 · Context Cloud</div>
<div class="rm-date">Sep 2026</div>
<div class="rm-feats">// injection · desktop app<br>context onboarding<br>team handoffs</div>
</div>
</div>

<div class="rm-node">
<div class="rm-dot-wrap"><div class="rm-dot">3</div></div>
<div class="rm-content">
<div class="rm-m-label">M3</div>
<div class="rm-title">V1.5 · Multiplayer</div>
<div class="rm-date">Jan 2027</div>
<div class="rm-feats">paid tier launch<br>daily digest<br>per-team context policy</div>
</div>
</div>

<div class="rm-node rm-far">
<div class="rm-dot-wrap"><div class="rm-dot">4</div></div>
<div class="rm-content">
<div class="rm-m-label">M4</div>
<div class="rm-title">V2 · Enterprise</div>
<div class="rm-date">H1 2027</div>
<div class="rm-feats">process telemetry<br>enforcement<br>Figma / GitHub bridges</div>
</div>
</div>

</div>
</div>

<p class="rm-critical"><strong>Critical path ·</strong> // Agents → free distribution · V1 → paid revenue · V1.5 → team pricing · V2 → enterprise</p>

---

<div class="eyebrow">Where we are · today</div>

## What's already on the table.

<div class="columns-3">

<div class="card">
<div class="stat-num">78</div>
<div class="stat-label">named <strong>operator skills</strong> shipped. Heuristic scan, journey map, premortem, contract readout, slice plan, trust receipt  -  all sourced.</div>
</div>

<div class="card">
<div class="stat-num">8</div>
<div class="stat-label">named <strong>agents</strong> across 3 layers  -  Tier 0 (Apex · Guard), Tier 1 (Echo · Prism), Tier 2 (Dora · Sol · Bran · May). Full stack.</div>
</div>

<div class="card">
<div class="stat-num">39</div>
<div class="stat-label"><strong>Israeli design leaders</strong> in commit conversations. TLV / Herzliya cluster days lined up for launch.</div>
</div>

</div>

<br>

<div class="columns-3">

<div class="card">
<div class="stat-num">65</div>
<div class="stat-label">commits pre-fundraise. Two founders, public repo, all shipped in the open.</div>
</div>

<div class="card">
<div class="stat-num">28</div>
<div class="stat-label">methodology pages  -  Fish spec, anatomy, transitions, contracts, HAI-collaboration, ai-modes.</div>
</div>

<div class="card">
<div class="stat-num">24K</div>
<div class="stat-label">lines of methodology spec + agent definitions in <code>github.com/talsolomon/DubleSlash</code>.</div>
</div>

</div>

<p style="text-align: center; font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.2rem; margin-top: 1em;">All shipped pre-fundraise. The substrate is in place  -  what we need is the runtime team to ship V1.</p>

---

<div class="eyebrow">Team</div>

## We've lived this. *Twice*.
<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.15rem; margin-top: 0.2em;">Two founders. Complementary craft. Same thesis. <strong style="color: var(--ink);">Already shipping in public.</strong></p>

<div class="columns">

<div class="card">

<img src="assets/Gemini_Generated_Image_saoj3osaoj3osaoj 1.png" class="team-photo">

<h3 style="color: var(--forest); font-size: 0.9rem;">Tal Solomon · co-founder · CEO</h3>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5em;">Product & design executive. Lived two platform shifts end to end: SaaS through 2018, AI through 2026.</p>

<p style="font-size: 0.95em;">Shipped product across the full stack of design, PM, and engineering. Deep in the practitioner network the OSS launch will spread through.</p>

</div>

<div class="card">

<img src="assets/Gemini_Generated_Image_saoj3osaoj3osaoj 2.png" class="team-photo">

<h3 style="color: var(--forest); font-size: 0.9rem;">Shenhav Lev · co-founder · CPDO</h3>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5em;">Senior product designer. Studio-grown, freelance-tested. The reason this is designer-led, not engineer-led.</p>

<p style="font-size: 0.95em;">Drove the visual + interaction system that makes Duble//Slash legible to a designer-first audience  -  the exact wedge that pulls dev + PM along.</p>

</div>

</div>

---

<div class="eyebrow">The ask</div>

## *$2.5M* seed · 18 months · ships V1 + opens Series A.

<div class="columns-asym">

<div style="display:flex; flex-direction:column;">

<div class="ask-num">$2.5M</div>

<div class="funds-cards" style="flex:1; align-content:center;">

<div class="funds-card eng">
<div class="funds-amount">$900k</div>
<div class="funds-label">Engineering</div>
<div class="funds-desc">2 engineers · 80k ₪/mo employer cost each · 18 months</div>
</div>

<div class="funds-card gtm">
<div class="funds-amount">$1.3M</div>
<div class="funds-label">GTM + Marketing</div>
<div class="funds-desc">Launch · content · events · design community programs</div>
</div>

<div class="funds-card infra">
<div class="funds-amount">$300k</div>
<div class="funds-label">Infra</div>
<div class="funds-desc">Cloud · CDN · security audit</div>
</div>

</div>

<p style="font-family: 'Fraunces', Georgia, serif; font-style: italic; color: var(--forest); font-size: 1.05rem; margin-top: 0.6em; margin-bottom:0;">Every dollar in this round ships product or buys distribution. Zero hand-wave.</p>

</div>

<div style="display:flex; flex-direction:column;">

<h3>Milestones the round buys</h3>

<div class="card-cream" style="background: var(--cream-soft); flex:1; display:flex; flex-direction:column; justify-content:space-between;">

<p><strong>M1 · // Agents Launch</strong> · May 2026<br><span style="font-size: 0.9em; color: var(--muted);">8 agents · 3 tiers · session capture · npx install</span></p>

<p><strong>M2 · V1 runtime</strong> · Sep 2026<br><span style="font-size: 0.9em; color: var(--muted);"><code>//</code> injection + Context Cloud + first 10 design partners</span></p>

<p><strong>M3 · V1.5 multiplayer</strong> · Jan 2027<br><span style="font-size: 0.9em; color: var(--muted);">Paid tier launch · 1k seats targeted</span></p>

<p style="margin-bottom:0;"><strong>M4 · Series A trigger</strong> · H1 2027<br><span style="font-size: 0.9em; color: var(--muted);">$300k+ ARR · Anthropic relationship · enterprise pilots</span></p>

</div>

</div>

</div>

---

<!-- _class: forest -->

<div class="eyebrow">The bet · the vision</div>

# By 2028, this is *how teams run* AI-assisted work.

<br>

<blockquote style="font-size: 1.6rem; line-height: 1.3;">The context layer is the most valuable real estate of the next decade.</blockquote>

<p style="font-family: 'Fraunces', Georgia, serif; color: var(--lilac); font-size: 1.2rem; line-height: 1.35; margin-top: 0.5em;">The methodology is the public good. The continuity layer is what we sell.</p>

<br>

<p style="color: var(--cream); font-size: 1.0rem; opacity: 0.65; line-height: 1.5;">When a team's context doesn't break, the company itself becomes legible to AI  -  naturally, bottom-up, without any engineering effort. Same shape as React → Vercel. The category creates the platform.</p>

<hr class="rule"/>

<div class="columns">

<div>
<h3 style="color: #B8C9BD;">Tal Solomon · co-founder</h3>
<p style="color: #F4ECD7; font-size: 1.05rem; margin: 0;">talsolomon21@gmail.com</p>
</div>

</div>
