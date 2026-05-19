# Industry Research Plan — Desk Sweep for Problem Validation

**Date:** 2026-04-21
**Owner:** Tal
**Analyst support:** Mary
**Status:** Plan drafted; ready to execute. **No scheduling dependency — start immediately.**

> This doc is **desk-ready** — open it when doing industry research. It covers the sources to sweep, the specific data points to extract per theme, and the citation-tracking approach.
>
> Hypotheses and themes this validates: [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) (5 themes A–E, 12 hypotheses H1–H12).
> Parallel user research: [`user-research-plan.md`](./user-research-plan.md).

---

## 1. Goal

Produce desk evidence that backs (or kills) each theme with specific, citable numbers from authoritative industry sources. Industry data does two jobs:

1. **Corroborates interview findings with scale** — "60% of our interviewees said X; GitHub Octoverse says Y% across 50k devs."
2. **Fills pool gaps** — the interview pool is design-heavy, so Theme E (governance) leans on desk data.

### Success criteria

- At least **10 cited desk sources** per theme — industry reports, surveys, peer-reviewed studies, high-signal community threads.
- A **desk research citation file** with every cited source, page/URL, extracted data point, and which theme it supports.
- Every theme one-liner in the deck is backed by at least one Tier-1 citation with a specific number.

---

## 2. Tier-1 sources (load-bearing for the deck)

These are the reports an investor would expect us to cite. Extract specific numbers and quotes.

| Source | Why | Extract targets |
|---|---|---|
| **Anthropic Economic Index** | Authoritative usage data from Claude itself | Task types, session durations, repeat-task rates; signals for Theme A (re-explanation) and C (workflow patterns) |
| **State of AI at Work** — Slack / Asana / Microsoft / GitHub editions | Industry benchmarks on adoption, time spent, pain points | Adoption %, hours-on-AI/week, "shadow AI" prevalence (Theme E), team-coordination gaps (Theme B) |
| **GitHub Octoverse** (latest) | Developer workflow + Copilot usage data | Multi-tool usage patterns, team-vs-individual stats (Theme B, D) |
| **Stack Overflow Developer Survey** (latest) | AI tool adoption, satisfaction, pain points across 60k+ devs | Install friction, tool-switching, satisfaction deltas (Theme D, A) |
| **a16z / Sequoia / Menlo "State of AI in Enterprise"** | VC-authored reports — literally what investors read | Market-sizing language, competitive landscape; use for positioning tone, not for our primary numbers |
| **Gartner AI adoption cycle reports** (where accessible) | Enterprise adoption curve + governance signals | Theme E — shadow AI adoption and governance gap |
| **McKinsey / BCG "AI at work" reports** | C-suite-readable productivity numbers | ROI-visibility claims (Theme E), adoption resistance (Theme D) |

---

## 3. Tier-2 sources (color + qualitative texture)

Use for quotes and texture, not primary numbers.

| Source | Why |
|---|---|
| **Lenny's Newsletter** archives (AI at work series) | PM-perspective, very close to our ICP |
| **Latent Space podcast + newsletter** | AI practitioner voice; often has team-workflow insights |
| **Every.to — especially "Napkin Math" and "Source Code"** | Design + PM perspectives on AI workflow |
| **Intercom's "Teams using AI" series** | Case studies of real team adoption |
| **r/ClaudeAI, r/ChatGPTPro, r/ExperiencedDevs, r/cscareerquestions** | High-signal complaints; search for "context," "re-explain," "lost" — direct Theme A evidence |
| **Hacker News** threads on AI-workflow pain (high comment counts) | Ditto — especially for Theme D (install) |
| **Shape Up case studies + Basecamp writing** | Comparison point for Theme C (methodology alternatives) |

---

## 4. Tier-3 sources (supporting only)

- Vendor blog posts (Anthropic, OpenAI, Cursor, Figma) — for understanding competitor positioning, not as evidence.
- X/Twitter threads — high risk of cherry-picking; use only for illustrative quotes, never as a load-bearing citation.

---

## 5. Extraction targets per theme

Before reading anything, define exactly what we want to find. This is the anti-confirmation-bias rule — we're looking for specific data points, not "interesting stuff."

| Theme | What to extract | What would kill it |
|---|---|---|
| **A — context memory** | Stats on context-loss hours/week, % of users citing re-explanation as a top pain, prevalence of multi-tool use (users with 2+ AI tools) | If Claude Projects / ChatGPT memory adoption is high AND satisfaction is high, the pain is being solved |
| **B — team memory** | % of teams reporting coordination gaps around AI, duplicate-work anecdotes, existing solutions in use (Glean, Notion AI) | If teams report Slack + Notion is sufficient and no duplicate-work pain |
| **C — operating model** | Agile-with-AI friction quotes, attempts at AI-specific methodologies, stats on process dissatisfaction in AI-heavy teams | If teams report Agile-with-AI works fine; or competing methodology has already claimed this space |
| **D — install + trust** | Time-to-first-value benchmarks for AI tools, abandonment stats, permission/security concerns in AI tool adoption | If install is trivial for target users; or trust is already solved by enterprise SSO/deployment |
| **E — governance + ROI** | % of employees using personal AI accounts for work, stats on enterprise AI governance gap, ROI-measurement attempts | If Copilot Enterprise / ChatGPT Enterprise / Gemini for Workspace have already closed this gap |

---

## 6. Citation tracking

Every cited source lands in a single file: `planning/research/user/desk-citations.md`. One row per citation:

```markdown
| Source | Date published | URL / page | Extracted data point | Theme | Tier |
|---|---|---|---|---|---|
| State of AI at Work 2026 (Slack) | 2026-02 | https://... p.14 | 71% of knowledge workers use AI weekly; 43% switch tools mid-task | A | 1 |
```

Rules:

- **One row per distinct data point** — don't bundle.
- **Verbatim quotes in double quotes, with page/timestamp.**
- **Date-published is load-bearing.** Anything older than 18 months gets a warning flag; >3 years stale requires explicit justification.
- **Tier 3 citations cannot stand alone** — must be paired with a Tier 1 or 2 citation supporting the same claim.

---

## 7. Timeline

Desk research runs **in parallel with interviews** (see [`user-research-plan.md`](./user-research-plan.md) §7). No scheduling dependency, so start W1.

| Week | Activity |
|---|---|
| W1 | Tier-1 sweep begins — Anthropic Economic Index, GitHub Octoverse, Stack Overflow Dev Survey, State of AI at Work (all editions). |
| W2 | Tier-1 continues. VC reports (a16z / Sequoia / Menlo) and McKinsey / BCG sweeps. |
| W3 | Tier-2 begins — Lenny, Latent Space, Every.to, Intercom. |
| W4 | Tier-2 continues. Reddit / HN thread sweep for Themes A and D. |
| W5 | Gap-fill — whatever is missing from Theme E (governance) gets extra attention. |
| W6 | Desk research wrap. Hand off citation file to synthesis (W7 in interview schedule). |

---

## 8. Anti-bias notes (desk-specific)

- **Define extraction targets BEFORE reading.** §5 exists so we search for specific data points, not "interesting stuff." Shopping for confirmation is the default failure mode of desk research.
- **Read the falsification column too.** Each theme in §5 has a "what would kill it" column — actively look for that data, not just the "validates" data.
- **Don't cite your way into a claim.** One stat from one report isn't a trend. Require at least two independent Tier-1 sources before a claim goes on a deck slide.
- **Recency matters more than prestige.** A 2026 Slack report beats a 2023 Gartner report for AI-adoption numbers. AI-at-work data ages fast.
- **Vendor reports are self-interested.** Anthropic's Economic Index is useful but has a PR angle. Cross-check with vendor-neutral sources (Stack Overflow, academic).

Full anti-bias framing lives in [`problem-hypotheses-and-themes.md`](./problem-hypotheses-and-themes.md) §9.

---

## 9. What this produces

1. **Desk research citation file** — `planning/research/user/desk-citations.md` with every cited source, extracted data point, and theme mapping.
2. **Per-theme fact packs** — merged into the per-theme synthesis docs ([`user-research-plan.md`](./user-research-plan.md) §8). Industry numbers + interview quotes side-by-side.
3. **Competitive landscape map** — byproduct of reading vendor reports; surfaces which adjacent tools might absorb each theme (e.g. does Glean close Theme B?).
4. **Deck-ready citation list** — the subset of citations actually used in the investor deck, with page references for due diligence.

---

## 10. Open questions before kickoff

- [ ] Paid-report access — do we have Gartner / McKinsey subscriptions, or do we need to rely on press summaries?
- [ ] How fresh is "fresh"? Locking 18 months as the staleness threshold by default; confirm or loosen.
- [ ] Citation tooling — plain markdown file, or Zotero / Notion? Default to markdown for git-trackability.
- [ ] Theme E reliance — if the interview pool can't cover security/IT, desk research has to carry Theme E alone. Flag any gap in the W5 gap-fill week.
