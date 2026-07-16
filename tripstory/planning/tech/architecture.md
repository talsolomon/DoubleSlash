# TripStory — Technical Architecture (concept level)

_No implementation. This is the system as six layers, so we know what we're building before we build it._

## The six layers

### 1. Location layer
- Input: phone GPS stream, or integration with Waze / Google Maps.
- Job: map-match the raw position to the road, know heading and speed, and answer "what is around me AND what is coming up ahead."
- Hard part: **look-ahead**. Audio for a landmark must *start before* you reach it so the payoff lands as you pass. Requires predicting the route or reading the nav app's planned route.

### 2. Knowledge layer (grounding — the accuracy insurance)
- Verified data sources, geo-indexed: Wikidata / Wikipedia (geo-tagged), OpenStreetMap POIs, national/heritage historical registers, national park + nature datasets, curated folklore/archaeology corpora.
- Job: for any point, return real, sourced facts and story seeds.
- Hard part: coverage + quality per region. This is why we start in one dense region (Israel) and one route.

### 3. Generation layer
- An LLM composes a narrated segment from grounded material: picks the angle, sets the companion's voice/personality, tunes for the age band (8-12), keeps it the right length for the driving window.
- Firm boundary: **generation may only state facts sourced from the knowledge layer.** It storytells, it does not invent. Every claim is traceable.
- Hard part: sounding fresh and warm, never recycled, never robotic.

### 4. Memory layer (the IP)
- A per-family knowledge graph:
  - **Heard** — every segment delivered, tagged by location + topic + date.
  - **Learned** — trivia the family got right (build on it, don't repeat it).
  - **Preferences** — do they lean folklore / animals / gross history / space? Steer future picks.
  - **Callbacks** — resurface prior segments as recall questions on the same stretch of road.
- Job: drive selection (what to tell next) and recall (what to ask about) so recurring drives get better, not stale.
- This is what makes the product un-clonable by a generic GPS app.

### 5. Delivery layer
- Text-to-speech in a warm, consistent companion voice (multilingual: Hebrew + English).
- Timing engine: play the right segment at the right moment; duck audio around Waze/Maps navigation prompts.
- Hard part: latency and natural pacing. It must feel like a friend in the passenger seat.

### 6. Commerce layer
- 1 free story → paywall → subscription (monthly and/or per-story).
- Family profiles tie to the memory graph (the thing worth paying to keep).

## Build order (mirrors the phase plan)
Layers 2 + 3 first (content engine), then 4 (memory), then 1 + 5 (live location + voice), then 6 (commerce) with a thin app shell. The app UI is the last and smallest piece.

## Integration question to resolve (OD)
- Own GPS vs Waze SDK vs Google Maps SDK for the location + look-ahead route. Affects the "sell to Waze" story and how much of the nav stack we depend on.
