# TripStory — Project Plan
_Forward-looking. The sequence, not a status report._

## Guiding principle
Prove the **content engine** first. Build the **app** last. If Phase 1 isn't magic in the car, nothing downstream matters. If it is, everything downstream is straightforward.

## Phases

### Phase 0 — Sharpen (now, no build)
- Lock the three forks: market (Israel), rider (8-12), frame (standalone-first).
- Run competitive + market research to ground the plan in what actually happened in this category.
- Capture concept, architecture, and open decisions in `brain/` and `planning/`.
- **Exit criteria:** owner says "the plan is right, here's the wedge."

### Phase 1 — Prove the content engine (the only thing that matters first)
- Pick ONE real route the owner drives (e.g. a regular family trip).
- Generate the full narrated experience for it: grounded, accurate, kid-tuned (8-12), non-repeating across 3 imagined trips.
- No app. Just a script/generation pipeline + audio files played in the car.
- **Exit criteria:** it's genuinely magic when played with real kids in a real car.

### Phase 2 — Memory + trivia loop
- Same route. Trip 2 remembers Trip 1 and calls back ("last time on this curve...").
- Trivia on new material + "remember last time" questions. Track what stuck.
- **Exit criteria:** the moat feels real — the second trip is better than the first because it remembers.

### Phase 3 — Real-time location + live voice
- GPS/Waze/Maps → segment triggering with look-ahead timing (audio starts before you pass the thing).
- TTS voice that sounds like a warm companion; audio ducking around navigation prompts.
- **Exit criteria:** hands-off, plays the right thing at the right moment on a live drive.

### Phase 4 — App shell + payments (deliberately last)
- Minimal app: welcome, play, profile/memory, trivia UI.
- Commerce: 1 free story → paywall → subscription (per-month and/or per-story).
- **Exit criteria:** a stranger's family can install, drive, and pay.

## The six-layer architecture (concept)
See `planning/tech/architecture.md`.
1. Location — GPS → map-matched point → "what's around me / ahead."
2. Knowledge — grounded facts from verified datasets. Accuracy insurance.
3. Generation — LLM composes a segment: angle, voice, age-tuning. Never invents facts.
4. Memory — per-family graph: heard / learned / preferences / callbacks. The IP.
5. Delivery — TTS voice, timing, audio ducking.
6. Commerce — free story → paywall → subscription.

## Business frame
- Standalone product families love → that is what makes it acquirable.
- Value that an acquirer buys: content engine + memory graph + loyal audience. Not the GPS trigger (commodity).
- Don't build the map. Build the thing on top of the map.
