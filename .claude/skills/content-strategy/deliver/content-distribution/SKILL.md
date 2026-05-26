---
name: ds-content-strategy-content-distribution
description: Plans and executes content distribution across channels with channel-specific copy, UTM tracking, paid amplification options, and community seeding strategy. Use when publishing content, maximizing reach, or asking "how do we get this content in front of the right people". Also triggers on: Channel adaptation, cross-posting strategy, distribution sequencing, paid amplification, email distribution, social posting schedule.
tags: [content-strategy, deliver]
model: inherit
---

# Content Distribution
**Domain**: Content Strategy | **Phase**: Deliver | **Invocation**: `/ds-content-strategy-content-distribution`

## What this produces
A content distribution plan: channel-by-channel adaptations with ready-to-post copy, publishing sequence, UTM tracking setup, paid amplification options, community seeding plan, and syndication strategy.

## Methods
Channel adaptation, cross-posting strategy, distribution sequencing, paid amplification plan, email distribution, social posting schedule, community seeding, influencer/partner distribution, UTM tracking setup, syndication strategy

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Top 2 channels, adapted formats, publishing schedule |
| Tuna | Multi-channel plan, adaptations, email + social strategy |
| Salmon | Full distribution with paid amplification, UTM setup, community seeding |
| Willy | All methods — syndication, partner distribution, full paid plan |

## Execution prompt
You are running Content Distribution for [project]. Maximize content reach through planned, multi-channel distribution.

**Input**: the content piece (title, URL, key insights, audience), available distribution channels, any budget for paid amplification.
**FISH classification**: [Nemo/Tuna/Salmon/Willy]

---

### Step 1 — Channel Adaptation Plan

Adapt the core content for each distribution channel:

```
SOURCE CONTENT
──────────────────────────────────────────────────────────────────
Title:    [Article/video/podcast title]
URL:      [Published URL]
Core insight: [The single most compelling idea — 1 sentence]
Best quote:   [The most shareable line from the piece]
Best stat:    [The most surprising or useful number]
CTA:          [What we want readers to do after engaging]
──────────────────────────────────────────────────────────────────

CHANNEL ADAPTATIONS
──────────────────────────────────────────────────────────────────

LINKEDIN (long-form post — 600–1,200 words):
  Hook (line 1, no link yet):
    "[Most provocative insight or counterintuitive claim]"
  Body (3–5 short paragraphs + white space):
    [Expand on the hook with 3 key points from the article]
    [Add personal context or experience if authentic]
  Closing:
    "[Prompt question that invites comments]"
    Link: [URL with UTM]
  Hashtags: #[tag1] #[tag2] #[tag3]
  Post time: [Best time for this audience — typically Tue-Thu 7-9am or 12-2pm]

TWITTER/X (thread — 6–10 tweets):
  Tweet 1 (hook): "[Bold claim or stat — no link yet]"
  Tweet 2: "[Supporting point 1 — 1 short paragraph]"
  Tweet 3: "[Supporting point 2]"
  Tweet 4: "[Surprising finding or counterintuitive detail]"
  Tweet 5: "[Practical takeaway]"
  Tweet 6: "[Key quote from the piece]"
  Final tweet: "Full breakdown here: [URL with UTM] — [what they'll learn]"
  Post time: [Best time — typically 9-11am weekdays]

EMAIL NEWSLETTER (feature or mention):
  Option A — Feature (primary story):
    Subject: "[Curiosity hook — 40–50 characters]"
    Preview: "[Expands on subject, 90–110 characters]"
    Body:    [200–300 word teaser — most compelling section, cuts to link]
    CTA:     "[Read the full piece →]" — [URL with UTM]

  Option B — Mention (secondary item):
    Section header: "[Brief label]"
    Body:           [2–3 sentences + link]

  Send to: [Segment — full list / specific segment]

SHORT SOCIAL (for platforms with character limits or visual-first):
  Instagram caption: "[Visual hook tied to image] + link in bio"
  Facebook:          [3–4 sentences + link]
  Threads:           "[Condensed insight in 500 characters]"
```

### Step 2 — UTM Tracking Setup

```
UTM Parameters — [Content piece name]:
──────────────────────────────────────────────────────────────────
utm_campaign: [content-title-slug]
utm_source:   [platform name — linkedin / twitter / newsletter / reddit]
utm_medium:   [organic-social / email / referral / paid-social]
utm_content:  [variant identifier — post-a / thread / feature / mention]

Full URLs per channel:
  LinkedIn post:   [base URL]?utm_source=linkedin&utm_medium=organic-social&utm_campaign=[slug]&utm_content=post
  Twitter thread:  [base URL]?utm_source=twitter&utm_medium=organic-social&utm_campaign=[slug]&utm_content=thread
  Newsletter:      [base URL]?utm_source=newsletter&utm_medium=email&utm_campaign=[slug]&utm_content=feature
  Community:       [base URL]?utm_source=[community]&utm_medium=referral&utm_campaign=[slug]&utm_content=community

Tracking validation:
  □ All URLs resolve correctly
  □ UTM parameters appear in analytics dashboard
  □ GA4 event fires on landing
```

### Step 3 — Publishing Sequence

```
Distribution Timeline:
──────────────────────────────────────────────────────────────────
Day 0     Publish on primary channel (blog / YouTube / podcast)
          Notify internal team via [Slack channel] — request shares

Day 1     LinkedIn long-form post (with hook, no immediate link)
          Email newsletter feature (if edition within 48h)

Day 2     Twitter/X thread
          Author shares on personal profiles (if applicable)

Day 3     Community seeding (Reddit / Slack group / Discord — if relevant)
          Partner notification (if co-created or partner-relevant)

Day 5     Check initial performance
          If LinkedIn post engaging → reply to all comments within 24h

Day 7     Secondary social post — different angle, different format
          (e.g., a pull quote graphic instead of a text post)

Day 14    Performance review
          If earning organic traffic → add to paid amplification shortlist
          If underperforming → identify distribution gap

Day 30    Update article if needed based on comments / new data
          Add to evergreen sharing rotation (re-share at [interval])
──────────────────────────────────────────────────────────────────
```

### Step 4 — Community Seeding Plan

```
Community Strategy:
  Rule: only share in communities where you are an active, genuine member.
  Never cross-post the same message to multiple communities simultaneously.
  Frame as sharing a resource, not promoting content.

Target communities:
────────────────────────────────────────────────────────────────────────
Community       Platform    Members  Posting rule           Timing
────────────────────────────────────────────────────────────────────────
[Community 1]   Reddit      [N]      [Link posts allowed / text only]  Day 3
[Community 2]   Slack       [N]      [Share in #resources or similar]  Day 3
[Community 3]   Discord     [N]      [Specific channel name]           Day 4
────────────────────────────────────────────────────────────────────────

Community post template:
  "[Genuine framing — why you're sharing this, what value it gives the community]
  [1–2 sentences on what the piece covers]
  [Link] — happy to answer any questions in the comments."
```

### Step 5 — Paid Amplification Options

```
Amplification decision criteria:
  Boost this piece if:
    □ Organic engagement rate > [benchmark %] in first 48h
    □ Content directly supports a conversion goal or campaign
    □ Piece performs well organically but could reach a larger audience

  Don't boost if:
    □ Content is too niche for paid distribution economics
    □ Landing page conversion rate is < [%] (fix the page first)

Paid amplification options:
  LinkedIn Sponsored Content:
    Objective:  [Awareness / Traffic / Lead gen]
    Audience:   [ICP targeting parameters]
    Budget:     $[X/day] for [N days]
    Expected:   [CPM / CPC estimate]
    Creative:   [Use the LinkedIn organic post or create new ad]

  Meta Traffic Campaign:
    Objective:  Traffic to article
    Audience:   [Lookalike from existing audience / interest-based]
    Budget:     $[X/day] for [N days]
    Creative:   [Image + shortened caption]

  Twitter/X Promoted Post:
    Objective:  [Reach / Engagement]
    Audience:   [Keyword targeting / follower lookalike]
    Budget:     $[X/day] for [N days]
```

### Step 6 — Syndication Strategy

```
Syndication options (republishing on third-party platforms):
  Medium:        [Yes / No] — use canonical tag pointing to original
  LinkedIn Articles: [Yes / No] — post 2 weeks after original publish
  Industry publication: [Target publication name] — submit pitch by [date]
  Newsletter swap: [Partner newsletter] — send to [Name] for consideration

Syndication rules:
  □ Always set canonical URL to the original published piece
  □ Wait minimum [14 days] before republishing elsewhere
  □ Update intro/outro for each platform's audience
  □ Do not syndicate before the original has been indexed by Google
```

---

## Final Output
- Channel adaptation copy (LinkedIn, Twitter/X, email, secondary social — ready to post)
- UTM-tagged URLs per channel
- Publishing sequence (day-by-day timeline)
- Community seeding plan with post templates
- Paid amplification options with budget and targeting
- Syndication strategy

**Recommended next skill**: `/ds-content-strategy-content-performance` — after distribution runs, analyze what performed and optimize the next content cycle.


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
