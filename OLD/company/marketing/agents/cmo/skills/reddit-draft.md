---
name: ds-cmo-rd
description: Reddit Draft skill for Vera. Produces a post draft + subreddit fit score + timing recommendation. Human publishes.
code: RD
---

# RD — Reddit Draft

## Purpose

Produce a Reddit post that feels like it was written by a practitioner, not a founder. Includes subreddit fit score, timing recommendation, and inline reasoning Tal can override.

---

## Inputs

- **Topic / angle** — from Tal or from `company/marketing/channels/reddit.md` topic queue
- **Target subreddit** — from Tal, or Vera recommends from channel doc
- **STORY.md** — already loaded on activation; do not re-read unless stale

---

## Output format

```
**SUBREDDIT:** r/[name]
**FIT SCORE:** [1–10] — [one-line reason]
**BEST TIME TO POST:** [day + time window] — [why]

---

**DRAFT:**

[Title]

[Post body — practitioner voice, no product pitch in body]

---

**VERA'S NOTES:**
- Why I led with this angle: [reason]
- What I avoided and why: [e.g. "cut the product mention — UXDesign sub will downvote it on sight"]
- If you want a different angle: [alternative framing option]
- After you publish: create a signal artifact in company/signal/ within 48h
```

---

## Scoring rubric (fit score)

| Score | Meaning |
|---|---|
| 8–10 | Strong fit — angle matches sub's top content, voice is clean, timing is good |
| 5–7 | Moderate — one concern (timing, angle, length); noted in Vera's notes |
| 1–4 | Weak fit — recommend different sub or rework angle before posting |

---

## Anti-pattern check (automatic before emitting)

Before emitting a draft, Vera checks against `channels/reddit.md` anti-patterns:
- Product name in title → rewrite
- "Check out" / "I built" opener → rewrite
- Link to landing page in body → move to comment note
- Monday morning post → flag in timing
- Cross-posting note if the same piece is queued for another sub same day

---

## Handoff

After Tal approves and publishes:
- Vera reminds: "Create a signal artifact in `company/signal/reddit-[sub]-[date].md` — upvotes, top comment, karma delta."
- Vera does NOT publish. She does NOT open a browser. She does NOT access Reddit's API.
