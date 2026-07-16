# Project Memory — TripStory
_Living document. Update every session. Always date your entries._

---

## What we're building
**TripStory** (working name) — a location-aware audio companion that turns any drive into a personalized, narrated episode and remembers your family across every trip.

Not "a podcast." Three engines stacked:
1. **Where-you-are engine** — GPS / Waze / Google Maps → "you are here, this is on your right."
2. **What's-worth-saying engine** — the road itself, folk stories, real people who lived here, nature, history, archaeology, and the killer points (must-see highlights).
3. **Who-you-are engine** — remembers what this family already heard and learned, never recycles, builds on prior knowledge, and quizzes with "remember last time we passed here?"

Engine #3 is the moat. Engines #1 and #2 are copyable. The **memory relationship** is why a kid begs to put it on again.

## The one-line pitch
> "The only road companion that remembers your family and never tells the same story twice."

## Why this is hard (and where the value is)
- The app is the easy part and gets built **last**.
- The company is the **content engine** (accurate, engaging, kid-appropriate, geo-precise, non-repeating for every mile) + the **memory graph**.
- A single hallucinated "fact" told to a 7-year-old is a brand-killer. Everything narrated must be grounded in verified sources. The LLM is a great storyteller, never a great inventor.

## Category reality (validate with research)
- This category EXISTS and has a graveyard: Autio (Kevin Costner, formerly HearHere), the old Detour (Andrew Mason, sold to Bose), GuideAlong, Roadtrippers-audio.
- None of them are built for **kids**, and none of them **remember you**. That is the entire wedge.
- Do not try to out-narrate Autio on adult travel facts. Win on kid engagement loop + cross-trip memory.

## Strategic bets (recommended, pending owner lock)
1. **First market: Israel.** Insane story density per km, short drives (fast quality feedback), Hebrew+English (multilingual as a feature), testable in the owner's own car with his own kids. Prove the engine here, then the global "sell to Google/Waze" story has teeth.
2. **Primary rider: older kids, 8-12.** Highest quality-per-effort band. Real stories, satisfying trivia, memory callbacks land. Grow *down* to 4-7 later.
3. **Frame: standalone product first, exit as outcome.** Nobody buys a GPS trigger. Acquirers would buy the content engine + memory graph + a loyal audience. Optimize retention and content quality; treat a Google/Waze exit as a side effect, never the roadmap.

## Current state
- **Phase:** 0 -> 1 boundary. MVP scope locked. Planning the backend (owner: "plan the BE first, don't run to the FE").
- **Session 2026-07-16 (4):** Narration & interaction design locked (`planning/product/narration-design.md`). The product is a communicational companion that plays with the kids: direct eyes -> prompt the hunt -> PAUSE -> reveal + celebrate -> story (incl. "what was here 100 yrs ago") -> hook forward. Key reframe: "constantly talk" = constant PRESENCE with rhythm and real silences, NOT wall-to-wall sound. MVP is interaction level L0 (talks, doesn't listen; rhetorical prompts + timed pauses fake two-way cheaply). Adds temporal-grounding requirement. Backend updated: a Segment is now a beat sequence, not one audio blob.
- **Session 2026-07-16 (3):** Backend architecture drafted (`planning/tech/be-architecture.md`). Central idea locked: the backend runs AHEAD of the car via a 7-stage look-ahead pipeline that pre-builds audio segments into a queue with trigger points. Components, data model, device/backend boundary, hard problems, and 7 open BE decisions captured. FE explicitly parked.
- **Session 2026-07-16 (2):** MVP v0.1 scope locked (`planning/product/mvp-spec.md`). Owner decided: no more research, build an MVP. Core loop = one-tap, automatic, constant, stable, Hebrew, story-teller narration of what kids see out the window, parent operates. Key correction: Waze/Google Maps do NOT expose "what's out the window"; MVP uses phone GPS + POI/knowledge and computes left/right/ahead ourselves. Memory/trivia/payments deferred.
- **Session 2026-07-16 (1):** Project scaffolded as an isolated folder under the DubleSlash workspace. Concept, architecture, competitive read, phased plan, and the three forking decisions captured. Owner recommendations logged (Israel / 8-12 / standalone-first) pending explicit lock.

### Locked (2026-07-16)
- Language: Hebrew (MVP). Operator: parent, one-tap. Audience: kids. Market ground: Israel.
- No more upfront research before MVP.
- Location source: phone GPS + our own POI/knowledge lookup, NOT Waze/Maps.
- Plan the backend before the frontend.

## What's open
1. **OD-01:** First market — Israel vs US vs global. (Recommended: Israel.)
2. **OD-02:** Primary rider age band — 4-7 vs 8-12 vs whole-family. (Recommended: 8-12.)
3. **OD-03:** Strategic frame — standalone vs build-to-sell vs both-sequenced. (Recommended: both, sequenced.)
4. **OD-04:** Do we run competitive/market research before locking the plan? (Recommended: yes, research then document.)
5. **OD-05:** Content sourcing strategy — which grounded datasets (Wikidata/Wikipedia geo, OSM, historical registers, folklore/archaeology corpora) and how curated vs generated.
6. **OD-06:** Voice/TTS approach and how the companion sounds (warm friend, not Wikipedia robot).
7. **OD-07:** Pricing — 1 free story, then $x/mo or per-story. Where the paywall sits so it converts without feeling cheap.
8. **OD-08:** Git-commit hook is pinned to a nonexistent macOS path; blocks pushes until fixed. tripstoryapp repo not yet in session scope.

## Links
- Repo: https://github.com/talsolomon/tripstoryapp
