# User Research Plan — Problem Validation Interviews

**Date:** 2026-04-21
**Owner:** Tal
**Analyst support:** Mary
**Status:** Plan drafted; ready for execution pending interview pool confirmation.

> This doc is **interview-ready** — open it before/during interviews. It covers the pool, the full unified guide, the notes template, and the synthesis approach.
>
> Hypotheses and themes this validates: [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) (5 themes A–E, 12 hypotheses H1–H12).
> Parallel desk research: [`industry-research-plan.md`](./industry-research-plan.md).

---

## 1. Goal

Produce interview evidence strong enough that each theme (A–E) is either **validated** (one-liner promoted to the deck, backed by quotes + numbers), **modified** (reframed per findings), or **killed** (dropped from positioning) — per the thresholds in [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) §5.

### Success criteria

- At least **25 completed interviews** (out of the 30-person pool) — 80%+ completion rate.
- Every interview produces a notes file using the template in §5.
- Per-theme synthesis docs (5 × ~1 page) saved to `planning/research/user/`.
- A **kill list** — themes that failed their threshold, explicitly retired from the deck.

---

## 2. Interview pool

> **Where the pool lives:** the live **Interviews tab** on the Tasks app ([dubleslash-tasks.vercel.app](https://dubleslash-tasks.vercel.app)). Each row = one contact with bucket, stage (In pool → Outreach → Scheduled → Conducted → Synthesized), next step, due, conducted-date, notes-file path, and freeform notes. Schema + RLS live in [`../../../supabase/migrations/20260422090000_interviews.sql`](../../../supabase/migrations/20260422090000_interviews.sql). Do not maintain a parallel spreadsheet — the DB is source of truth.

### Size and composition

- **Total target:** 30 interviewees. **Completion target:** 25 (accounting for no-shows and reschedule drift).
- **Source:** Tal's personal network. 39 design leaders were imported from LinkedIn connections on 2026-04-19 (see git: `e6b7ad5`) into `outreach_contacts` — candidate source for the interview pool.

### Role split (target, not rigid)

| Role | Target | Why |
|---|---|---|
| Design leaders (Director+, Head of Design, VP) | 12 | Own methodology adoption; speak for teams; decision-makers on process and tooling |
| Hands-on designers / design engineers | 8 | Feel install and context pain most directly; use AI tools daily |
| PMs / design-adjacent PMs | 5 | Own rituals and process; see the Agile-vs-AI tension firsthand |
| Eng managers at design-heavy orgs | 5 | Bridge design-eng; validate Theme B (team memory) and Theme C (operating model) |

### Screening criteria

Include only if the interviewee:

- Uses at least **two** of: Claude, ChatGPT, Cursor, Copilot, Perplexity, Figma AI — **at least weekly** — for real work (not hobby).
- Works on a team of **≥3** (solo founders skew Theme B).
- Is at a company **not purely AI-infra** (want product teams using AI, not AI labs).

Explicitly *exclude*: pure AI-researchers, pure prompt-engineers, solo indie hackers. These aren't our ICP.

### Known pool gap

The 30-person pool is design-heavy. **Theme E (governance / shadow AI)** wants security / IT leads, which this pool doesn't cover. Two options:

1. Recruit 3–5 security leads separately (stretch goal).
2. Rely on desk research for Theme E (see [`industry-research-plan.md`](./industry-research-plan.md)) and note the gap in the synthesis.

Default to option 2 unless the design interviews surface governance pain strongly enough to justify the extra recruitment.

---

## 3. Logistics

- **Format:** semi-structured. Remote video (Zoom / Meet). ~45 minutes.
- **Recording:** audio-recorded with consent; transcribed via Whisper or Otter.
- **Notes:** taken live in the template in §5, saved to `planning/research/user/interviews/`.
- **Anonymization:** confirm per-interviewee at the close (name omitted | title OK | quotes OK).
- **Consent script:** "Can I record this? I'd use anonymized quotes in investor materials — your name and company would be omitted; title and role are OK to attribute unless you say otherwise."

---

## 4. Interview guide (~30 min, v2 — conversational flow)

> **Live version of this guide runs inside the Tasks app.** Click **▶ Run** on any interview contact to open interview-mode with these questions pre-loaded. Source of truth: [`supabase/migrations/20260422100000_interview_flow_v2.sql`](../../../supabase/migrations/20260422100000_interview_flow_v2.sql). This doc mirrors it for offline reading.

**One script for all interviewees**, merged from the 5 themes into 4 conversational arcs. A+B (memory) share a session because context-loss and team-invisibility usually surface together; D+E (install + shadow AI) share because trust drives both. C stays alone — it's the differentiator.

Each section has: an **anchor** (always), 1–3 **probes** (asked if the conversation goes there), and a **counter-probe** (actively try to falsify, not confirm).

### Intro (2 min)

- **Consent:** "Can I record this? I'd use anonymized quotes in investor materials — your name and company would be omitted; title and role are OK to attribute unless you say otherwise."
- **Anchor:** "Quick setup — your role, team size, and roughly what % of your work involves AI tools right now."

### Memory — yours and your team's (7 min)

*Themes A + B · Hypotheses H1, H2, H3, H6, H7, H11, H12*

- **Anchor:** "Tell me about a recent AI session you wish was still open — or that you had to restart from scratch. What happened? What got lost?"
- **Probe:** "Who on your team knows what you just did with AI? How does that knowledge travel across people — or does it?"
- **Counter-probe:** "Do Claude Projects, ChatGPT memory, Cursor rules, or a shared Notion already cover this for you? Where does it break?"

### How the team actually runs (8 min — highest priority)

*Theme C · Hypotheses H4, H8, H9 · This is the headline bet.*

- **Anchor:** "Does your team have a *named* process for AI-assisted work? What do you call it?" *(Listen for: "not really", "kind of Agile", "we're figuring it out".)*
- **Probe:** "Walk me through a time your existing process — Agile, sprints, Shape Up, whatever — felt *off* because AI moved faster (or slower) than the rhythm it was built for."
- **Probe (FLOW vocab test):** "If I said 'Fish model — Head explores, Body builds, Tail ships, and every task is sized bigger-vs-smaller × known-vs-unknown' — does any part of that vocabulary map to something missing in your world?"
- **Counter-probe:** "Is Agile-with-AI basically fine for you, just faster? What would have to change for you to switch frameworks?"

### Install + trust (6 min)

*Themes D + E · Hypotheses H5, H10, H11*

- **Anchor:** "Walk me through the last AI tool you tried to install on your work machine. What happened?"
- **Probe:** "When something AI-powered lands on your machine, what runs through your head — permissions, data, what it's watching, where things go?"
- **Probe (shadow AI):** "Does anyone on your team use personal Claude or ChatGPT accounts for work? Why?" *(Ask casually — surfaces governance gap without judgment.)*
- **Counter-probe:** "Is install actually the blocker, or is it something else — time, priority, permission from IT?"

### The pain you'd pay to fix (4 min)

*Open-ended · the only validation that counts for the deck.*

- **Anchor:** "What pain in your AI workflow would you pay — actual money, not 'I'd try it' — to make go away?"
- **Probe:** "What should I have asked that I didn't? What AI-workflow pain did none of my questions touch?"

### Close (2 min)

- **Referral:** Ask for 1 referral — one design leader or hands-on practitioner who should be in this research.
- **Anonymization:** Confirm preferences — name/company omitted, title/role OK, or fully anonymous quotes.

---

## 5. Notes template (per interview)

Every interview produces one file in `planning/research/user/interviews/`. Template:

```markdown
# Interview — {Name-or-initials}, {Role}, {Company-size}

**Date:** YYYY-MM-DD
**Tools used weekly:** {Claude / ChatGPT / Cursor / etc.}
**Team size:** {n}
**Anonymization:** {name omitted | title OK | quotes OK}

## Theme A — Context memory
- Key quote:
- Specific example given:
- Counter-probe response:

## Theme B — Team memory
- ...

## Theme C — Operating model
- ...

## Theme D — Install + trust
- ...

## Theme E — Governance + ROI
- ...

## Section 6 — Open-ended
- What I didn't ask about:
- Would-pay pain:

## Tagged quotes (for cross-theme analysis)
- "{verbatim quote}" — tag: #A-reexplanation | #C-agile-broke | ...

## Signals
- Strong validation signals: ...
- Falsification signals: ...
- Surprises: ...
```

---

## 6. Synthesis approach

Every **5 interviews**, run a rolling synthesis. Don't wait until all 25 are done — directional findings after interview 10 often change the guide for interviews 11–30.

### Per-interview coding

- Tag every quote with its theme (#A / #B / #C / #D / #E) and signal type (#validates / #falsifies / #surprise).
- Note a "would-pay" marker on any pain the interviewee explicitly says they'd pay to fix.

### Per-theme synthesis (after all interviews complete)

For each theme, produce one ~1-page synthesis (see [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) §5 for the full output spec):

1. Count of validated vs. falsified.
2. Top 5 quotes.
3. Three numbers.
4. Threshold check (pass/fail per the thresholds in the hypotheses doc).
5. Revised one-liner in interview language.
6. Competitive watch-out.

---

## 7. Timeline

Assuming Tal runs interviews at ~4/week (realistic with scheduling + day job):

| Week | Activity |
|---|---|
| W1 | Recruit: send outreach to 40 from 30-target pool (expect 75% response). Lock interview guide. |
| W2 | Interviews 1–4. First rolling synthesis. |
| W3 | Interviews 5–9. Second rolling synthesis — adjust guide if needed. |
| W4 | Interviews 10–14. Third rolling synthesis. |
| W5 | Interviews 15–19. Fourth rolling synthesis. |
| W6 | Interviews 20–25. |
| W7 | Synthesis — per-theme writeups. Draft revised deck one-liners. |
| W8 | Buffer + stragglers + investor deck rewrite against validated themes. |

**Total: 8 weeks.** Compression possible if Tal can do 6 interviews/week — down to ~6 weeks.

Desk research runs in parallel; see [`industry-research-plan.md`](./industry-research-plan.md) §5 for that schedule.

---

## 8. What this produces

1. **Interview notes archive** — 25 files in `planning/research/user/interviews/`, redacted per consent.
2. **Per-theme synthesis docs** (5 × ~1 page) — saved to `planning/research/user/`.
3. **Revised deck problem slides** — the actual outputs that go into the investor deck, traceable back to specific interviews.
4. **Kill list** — themes that failed their threshold, with the evidence that killed them. Saved as a footnote doc so future-us doesn't re-litigate.

---

## 9. Anti-bias checklist (interview-specific)

Re-read before each interview:

- [ ] **Counter-probe every theme.** Each section has one — actually use it.
- [ ] **"Would you pay?" is the only validation that counts.** "That'd be nice" is zero evidence. "I'd pay $X/seat" is gold.
- [ ] **Don't lead.** If you catch yourself completing the interviewee's sentence, stop.
- [ ] **Don't explain Duble Slash.** This interview is about *their* pain, not our product. Save the product pitch for after the close.
- [ ] **Track surprises separately.** Things that didn't fit any theme often become the next product cycle's wedge.

Full anti-bias framing lives in [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) §9.

---

## 10. Open questions before kickoff

- [ ] Who owns scheduling the 30 interviews — Tal, or a research associate?
- [ ] Recording platform + transcription service — confirm and configure before interview 1.
- [ ] Compensation — are we offering anything (gift card, product early access) to interviewees? Affects response rate.
- [ ] Theme E scope — commit to option 1 (recruit security leads separately) or option 2 (desk-only for E). Default option 2.
- [ ] Confidentiality — is any interviewee at a competitor or potential strategic partner? Flag before interview to avoid awkwardness.
