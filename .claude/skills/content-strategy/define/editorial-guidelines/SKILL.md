---
name: ds-content-strategy-editorial-guidelines
description: Writes editorial guidelines covering voice, style, format templates, SEO writing rules, and review workflow. Use when building a content team, onboarding contributors, or asking "how should our content sound and how do we keep it consistent". Also triggers on: Voice and tone definition, writing style guide, format template design, headline standards, SEO writing guidelines, review process design.
tags: [content-strategy, define]
model: inherit
---

# Editorial Guidelines
**Domain**: Content Strategy | **Phase**: Define | **Invocation**: `/ds-content-strategy-editorial-guidelines`

## What this produces
An editorial guidelines document: voice and tone rules with examples, writing standards, format templates, SEO writing guidelines, image and media standards, attribution rules, and the review and approval process — everything a new contributor needs to produce on-brand content from day one.

## Methods
Voice and tone definition, writing style guide, format template design, headline and structure standards, SEO writing guidelines, image and media guidelines, sourcing and attribution rules, review workflow design, contributor onboarding guide

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Voice principles, writing standards, review workflow |
| Tuna | Voice, style, format templates, SEO guidelines |
| Salmon | Full guidelines with media rules, attribution, contributor guide |
| Willy | All methods — full contributor onboarding, style edge cases, format library |

## Execution prompt
You are running Editorial Guidelines for [project]. Produce a guidelines document that enables consistent content across contributors.

**Input**: content strategy, brand voice (if documented), any existing style preferences or examples.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Section 1 — Voice and Tone

```
Brand voice: [3 adjectives that describe our personality]
  [Adjective 1]: [What this means in practice — with example]
  [Adjective 2]: [What this means in practice — with example]
  [Adjective 3]: [What this means in practice — with example]

Voice vs. Tone distinction:
  Voice is constant — it's who we are.
  Tone adapts — it's how we respond to the situation.

Tone by context:
  Educating:      [e.g., "Warm and clear — teacher energy, not professor energy"]
  Celebrating:    [e.g., "Genuine and specific — not hyperbolic"]
  Addressing problems: [e.g., "Direct and calm — never defensive"]
  Selling:        [e.g., "Honest and specific — no vague superlatives"]

Voice spectrum examples:
  We sound like:    [Example sentence in our voice]
  We don't sound like: [Example of what to avoid]

Words we use:         [List of approved/preferred terms]
Words we avoid:       [List of banned terms — jargon, superlatives, hedging]
Competitor references: [Never name / generic reference only / can reference with care]
```

### Section 2 — Writing Standards

```
Structure:
  Opening:    Hook in the first sentence — state the value or the problem immediately.
              Never start with background or context. Never start with "In today's world...".
  Body:       One idea per paragraph. Max 3–4 sentences per paragraph.
              Use subheadings every 300–400 words for scannability.
  Closing:    End with a clear takeaway and a single CTA. Never trail off.

Sentence standards:
  Target sentence length: 15–20 words average
  Max sentence length: 30 words before breaking into two
  Avoid: passive voice, nominalization (use "we decided" not "a decision was made")
  Avoid: hedging language ("kind of", "sort of", "perhaps", "might possibly")

Paragraph standards:
  Max length: 4 sentences
  White space rule: Never stack more than 3 paragraphs without a subheading or visual break

Reading level target: Grade [8-10] (use Hemingway App or equivalent)

Inclusive language:
  Use gender-neutral language (they/their as singular is acceptable)
  Avoid ableist language: [list any specific banned phrases]
  Cultural sensitivity: [any specific notes relevant to your audience]

Numbers and data:
  Spell out numbers 1–9; use numerals for 10+
  Always cite the source of statistics
  Round numbers where precision is misleading (say ~$1M not $1,042,887)
  Use percentages not fractions: 40% not 2/5
```

### Section 3 — Format Templates

**Blog / Long-form Article Template:**
```
[Title: 50–60 characters | Keyword-forward | Benefit or question]

[Opening paragraph: Hook + problem statement + what you'll learn. Max 80 words.]

## [H2: First major section — keyword-adjacent]
[Section body: 300–500 words. One main point. Evidence or example.]

### [H3: Subpoint if needed]
[...]

## [H2: Second major section]
[...]

## [H2: Key takeaways or conclusion]
[3–5 bullet points summarizing the main points]

[Closing paragraph: Reinforce the main message + single CTA]

[Author bio: 2 sentences. Name, role, relevant credential.]
```

**Newsletter Template:**
```
Subject line: [40–50 characters | Curiosity or value hook]
Preview text: [90–110 characters | Expands on subject]

[Opening: 2–3 sentences — personal, topical, or conversational]

[Main story: 200–400 words | One idea, fully developed]
  → [Optional: secondary item — 100–150 words]
  → [Optional: third item — 50–100 words]

[CTA: One action | Button label: [verb + noun]]

[Footer: unsubscribe link | company address | preferences]
```

**Social Post Templates:**
```
LinkedIn (long-form post):
  Line 1:   Hook — a bold claim, question, or insight (no more than 1 sentence)
  Lines 2-3: [white space]
  Body:     [5–8 short paragraphs, each 1–2 sentences]
  Closing:  [Question to prompt comments OR clear CTA]
  Hashtags: 3–5 relevant, lowercase

Twitter/X thread:
  Tweet 1:  Hook — most interesting claim or finding
  Tweets 2–8: One supporting point per tweet
  Final tweet: Summary + CTA or link
```

### Section 4 — Headline and Title Standards

```
Headline formula options:
  How-to:     "How to [accomplish X] [without Y / in Z time]"
  Number list: "[N] Ways to [accomplish X]" or "[N] [Things] That [Outcome]"
  Question:   "Why [Common Belief] Is [Wrong/Right] — and What to Do Instead"
  Result:     "[We/Company] Did X. Here's What Happened."
  Contrarian: "Stop [Common Advice]. Do This Instead."

Title quality checklist:
  □ Contains the primary keyword (ideally front-loaded)
  □ Under 60 characters for SEO
  □ Specific — not vague ("A Guide to Content" is weak; "How to Write a Content Brief in 20 Minutes" is strong)
  □ Matches search intent (informational H2 ≠ commercial keyword)
  □ No clickbait — the content delivers what the title promises

Subheading (H2/H3) rules:
  □ Descriptive — someone scanning should understand the section without reading the body
  □ Use H2 for major sections, H3 for supporting points only
  □ Keep H2s parallel in structure within an article
  □ Front-load with the key term where possible
```

### Section 5 — SEO Writing Guidelines

```
On-page SEO checklist per article:
  □ Primary keyword in title (first 60 characters)
  □ Primary keyword in H1
  □ Primary keyword in first 100 words of body
  □ Primary keyword in meta description (150–160 characters)
  □ Secondary keywords in at least 2 H2 subheadings
  □ Image alt text includes keyword where natural
  □ 3–5 internal links to related content
  □ 1–2 external links to credible sources (opens in new tab)
  □ URL slug: short, keyword-forward, hyphens not underscores

Keyword density:
  Target: 1–2% density — natural usage, not forced
  Never: keyword stuffing. If it sounds awkward, remove it.

Featured snippet optimization (for informational queries):
  Use a clear definition paragraph within first 300 words
  Use numbered lists for "how to" queries
  Use comparison tables for "vs." or "best" queries
```

### Section 6 — Sourcing, Attribution, and Accuracy

```
Source quality hierarchy:
  1. Original research (our own data) — always preferred
  2. Peer-reviewed studies and academic sources
  3. Government and regulatory publications
  4. Reputable industry analysts (Gartner, Forrester, McKinsey)
  5. Major news outlets with named sources
  6. Expert interviews (name + title + organization required)

What requires a citation: all statistics, claims about competitors, quoted material, medical/legal/financial claims

What does not require a citation: widely accepted facts, our own original analysis

Fact-checking process:
  All statistics must be verified against the primary source (not a secondary cite)
  Stats older than [2 years] must be updated or flagged as dated
  Any claim a reader might challenge must have a citation

Image and media:
  Only use licensed images (source: [approved library — e.g., Unsplash, internal])
  Never use images without confirmed licensing
  Alt text required on every image (descriptive, not "image of...")
  Video: captions required on all published videos
```

### Section 7 — Review and Approval Workflow

```
Standard review process:
────────────────────────────────────────────────────────────────────────
Stage               Owner              SLA              Tool
────────────────────────────────────────────────────────────────────────
Draft submitted     Author             —                [CMS / Notion / Docs]
Editorial review    Editor             2 business days  Comments in doc
SEO review          SEO lead           1 business day   SEO checklist
Revision round      Author             1 business day   —
Final approval      Editor / Lead      1 business day   Sign-off comment
Assets requested    Designer           2 business days  [Design tool]
Scheduled to publish Editor            —                CMS
────────────────────────────────────────────────────────────────────────

Feedback format:
  Editors use: [Comment format — e.g., [MUST], [SHOULD], [SUGGESTION]]
  Authors respond to every [MUST] and [SHOULD] before resubmitting

Escalation: If review exceeds SLA, [contact person / process]
```

---

## Final Output
- Voice and tone guide (3 voice traits with examples + tone by context)
- Writing standards (structure, sentence/paragraph rules, reading level)
- Format templates (blog, newsletter, social)
- Headline and title standards with formula options
- SEO writing checklist (on-page requirements per piece)
- Sourcing and attribution rules with quality hierarchy
- Review and approval workflow with SLAs

**Recommended next skill**: `/ds-content-strategy-content-planning` — put the strategy and guidelines into an executable production plan with calendar, briefs, and owner assignments.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
