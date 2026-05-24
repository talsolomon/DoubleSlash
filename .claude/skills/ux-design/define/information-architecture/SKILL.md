---
name: ds-ux-design-information-architecture
description: Defines the structure, hierarchy, and navigation of a product. Use when designing a new product, restructuring navigation, or asking "how should this be organized". Also triggers on: card sorting, tree testing, site map design, navigation hierarchy, content taxonomy, findability analysis, label testing.
tags: [ux-design, define, information-architecture, card-sorting, tree-testing, taxonomy, navigation]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# Information Architecture
**Domain**: UX Design | **Phase**: Define | **Invocation**: `/ds-ux-design-information-architecture`

## What this produces
An information architecture document with site/app map, navigation hierarchy, content taxonomy, findability analysis, and label decisions ready to hand to a designer for wireframing.

## Methods
Card sorting (open/closed), tree testing, site map design, navigation hierarchy design, content taxonomy, mental model mapping, findability analysis, label testing, wayfinding design, search and filter architecture

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | IA sketch | Site map + top-level navigation + label decisions |
| Tuna | Full IA | Site map + navigation hierarchy + card sort analysis + taxonomy |
| Salmon | Validated IA | All above + tree testing results + findability analysis |
| Willy | IA system | All methods + search architecture + wayfinding design |

---

## Execution Prompt

Read the project context: content inventory, user research findings, product scope, existing navigation (if redesign), FISH classification.

---

### Step 1 — Content Inventory (all FISH levels)

Before you can structure content, you must know what exists.

List every content type in the product:
```
Content type | Owner | Primary users | Update frequency | Display format
[Page/feature] | [who creates/owns it] | [who accesses it] | [how often it changes] | [list/detail/form/dashboard]
```

**For redesigns:** audit the current content and flag:
- Orphaned content (exists but nobody finds it)
- Duplicated content (same information in multiple places)
- Missing content (users look for it but it doesn't exist — from research)
- Outdated content (exists but shouldn't)

---

### Step 2 — Card Sorting (Tuna, Salmon, Willy)

Card sorting reveals how users mentally group content.

**Open card sort** (for new navigation — no predefined categories):
```
Participants: 15–20 users
Method: Give users cards (one per content item), ask them to group cards that belong together and name each group
Output: dendrogram showing how often items were grouped together
```

**Closed card sort** (validating proposed navigation):
```
Participants: 15–20 users
Method: Give users cards + predefined categories, ask them to place cards
Output: % agreement per card → category
```

**Card sort analysis output:**
```
Category: [proposed navigation label]
  Items with > 70% agreement: [confidently included]
  Items with 40–70% agreement: [needs label testing]
  Items with < 40% agreement: [navigation problem — these items are lost]
  
Surprise findings: [items users consistently grouped with non-obvious categories]
Mental model signal: [what the groupings reveal about how users think]
```

**Agreement threshold:** < 50% agreement on where an item belongs = the navigation label or item label is wrong. Retest after revision.

---

### Step 3 — Site Map (all FISH levels)

The site map is the authoritative structure of the product. All design must conform to it.

```
[Product name]
├── [Level 1: primary navigation item]
│   ├── [Level 2: section or page]
│   │   ├── [Level 3: sub-page or modal state]
│   │   └── [Level 3: ...]
│   └── [Level 2: ...]
├── [Level 1: ...]
│   └── ...
└── [Global: Search / Notifications / Settings / Help]
```

**Site map rules:**
- Maximum 3 levels of hierarchy for any path (deeper = findability crisis)
- Global elements (search, account, help) live outside the hierarchy
- Every leaf node is a real screen or state, not a concept
- Flag orphan pages (no path from navigation) — these die

**Navigation patterns to choose from:**
| Pattern | When to use |
|---|---|
| Flat navigation | < 5 top-level items, content is parallel |
| Hub and spoke | Mobile, one primary task per section |
| Hierarchical | Complex content, many sub-pages |
| Matrix | Power users, many cross-connections |
| Sequential | Onboarding, checkout — one path |

---

### Step 4 — Tree Testing (Salmon, Willy)

Tree testing validates that users can find things in the proposed IA — without visual design.

**Tree test design:**
```
Tasks: 8–12 findability tasks
Format: "Where would you go to [task]?" — presented as a text-only tree
Participants: 30+ (need statistical power for tree testing)
Tool: Optimal Workshop Treejack or equivalent
```

**Task design:**
- Tasks describe what the user wants to accomplish, not the label they should click
- Include 2–3 tasks for each high-priority content item
- Include 1–2 "distractor" tasks (items that don't exist — tests whether users notice)

**Tree testing metrics:**
| Metric | Definition | Target |
|---|---|---|
| Directness | % who found item without backtracking | > 70% = good |
| Success rate | % who landed on correct item | > 80% = good |
| First click | % who made correct first click | > 60% = good |
| Time | Average time to find item | — (context dependent) |

Items with < 60% success rate need IA revision. Items with low directness but high success = users find it, but it's in the wrong place.

---

### Step 5 — Content Taxonomy (Tuna, Salmon, Willy)

Taxonomy governs how content is labeled, categorized, and related.

**Taxonomy design:**
```
Term: [official label used throughout the product]
Definition: [what this means in this product — 1 sentence]
Synonyms users use: [from research — what users call this]
Parent category: [where this fits in the hierarchy]
Related terms: [cross-links to related content]
Scope: [what this includes and excludes]
```

**Label testing:** if the same content has multiple plausible labels, test them.

Format: "Which of these labels would you click if you wanted to [task]?"
- Show 2-3 label alternatives
- 50 responses per test (can be done via Maze, Usabilityhub)
- Threshold: label with > 60% vote wins

**Label quality bar:**
- Uses the user's vocabulary (from research), not product/internal vocabulary
- Matches the mental model (what users expect to find under this label)
- Specific enough to distinguish from siblings (not just "More")
- Short enough to work in mobile navigation (ideally < 15 characters)

---

### Step 6 — Findability Analysis (Salmon, Willy)

After designing the IA, analyze findability for the product's highest-priority content.

**For each priority content item:**
```
Item: [content name]
Path from home: [Home → Level 1 → Level 2 → Item]
Path length: [N clicks]
Alternative paths: [other routes to reach this content]
Findability risk: High / Medium / Low
Risk reason: [why a user might not find this — label mismatch, wrong hierarchy level, etc.]
Mitigation: [search indexing, cross-links, promotion in navigation, etc.]
```

**Findability red flags:**
- Path length > 3 clicks for primary-use content
- Only one path to high-frequency content
- Label that doesn't match user vocabulary
- Buried in a sub-category that doesn't match user mental model

---

### Step 7 — Search and Filter Architecture (Willy)

For products with large content sets where navigation alone is insufficient:

**Search design:**
```
Searchable content types: [what is indexed]
Search scope: [global / section-specific]
Result format: [title + description + category + timestamp]
Empty state: [what appears when no results found — suggestions, popular content]
Autocomplete: [yes/no — if yes, based on what signals]
Filters: [available on search results — what dimensions can be filtered]
```

**Filter architecture:**
```
Filter: [name]
Type: [single-select / multi-select / range / date]
Values: [how values are generated — static list / dynamic from content]
Default: [default state]
Interaction: [instant filtering vs. apply button]
```

---

### Final Output

**Content inventory** — all content types, owners, frequencies (for redesigns)
**Card sort analysis** — agreement rates per item, mental model signals (Tuna+)
**Site map** — full hierarchy with pattern decision rationale
**Tree testing results** — success rates, directness, items that need revision (Salmon+)
**Content taxonomy** — official labels, definitions, user synonyms (Tuna+)
**Label test results** — winning labels with confidence (Salmon+)
**Findability analysis** — risk rating per priority content item (Salmon+)
**Search and filter architecture** — for content-heavy products (Willy)
**Recommended next skill** — `/ds-ux-design-wireframing` (design the screens) with one-sentence reason
