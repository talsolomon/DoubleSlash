# TripStory — MVP Spec (v0.1)

_Locked 2026-07-16. The smallest thing that tests the core magic: does automatic, in-place Hebrew storytelling delight kids in a moving car?_

## The one question the MVP answers
Does a hands-off app that automatically narrates, in Hebrew, what the kids can see out the window, feel magic in a real car on a real drive?

Nothing else is being tested yet. If this feels magic, everything downstream is worth building. If it doesn't, no memory graph or trivia will save it.

## The core loop
1. **Parent taps one button.** That is the entire operation (operator = parent, must be dead simple).
2. **App reads the phone's own GPS:** position, heading, speed.
3. **It finds real things near and ahead** of the car from grounded sources, and computes left / right / ahead from heading + the thing's bearing.
4. **It composes a short Hebrew story** about what's visible, in a warm story-teller voice, age-tuned for kids.
5. **It speaks it aloud, then repeats** continuously as the drive progresses. Constant and stable.

## Hard requirements (from the owner)
- **Automatic** — understands the road and what is in view without the parent doing anything after the first tap.
- **Constant + stable** — keeps going reliably for the whole drive, no babysitting.
- **Story-teller** — narrative and warm, not a Wikipedia read-out.
- **Hebrew** — Hebrew only for v0.1.
- **Very easy to start** — one tap. The parent is driving.

## Critical correction: location source
- **Waze and Google Maps do NOT expose "what's out the window" to third-party apps.** Waze has no public position/surroundings API (fleet/partner SDK + deep links only). Google Maps Navigation SDK is paid, approval-gated, and still would not provide POIs, you compute those yourself.
- **MVP uses the phone's native location** (Core Location / Fused Location or the browser Geolocation API) for position + heading + speed.
- **"What's out the window" is computed by us**: known POI coordinates + car heading -> bearing -> left / right / ahead.
- Waze / Maps integration is a "nice later," never an MVP dependency.

## Grounding (no invented facts, ever)
- POI + knowledge lookup: Google Places (nearby, names, types) + Wikipedia / Wikidata geo (real facts + story seeds).
- The LLM storytells from sourced material only. It does not invent facts told to a child.

## Explicitly OUT of the MVP (deferred, not dropped)
- Memory / no-repeat across trips (the eventual moat) — design so it slots in, but not built yet.
- Trivia and recall questions.
- Accounts, family profiles, payments, the free-story paywall.
- Non-Hebrew languages.
- Waze / Google Maps integration.

## Open build decisions (need owner's pick to start)
- **BD-01 Platform.** Mobile web (PWA, open-a-link, fastest to test, works on his existing phone) vs native iOS vs native Android. Recommendation: web-first to prove the loop this week, go native once it feels good.
- **BD-02 Voice.** Built-in device TTS (free, instant, robotic) vs cloud Hebrew TTS (Google / Azure / ElevenLabs, far better story-teller feel, needs an API key + connectivity + small cost). Recommendation: cloud Hebrew TTS, because voice quality is most of the magic for kids; device TTS as fallback.
- **BD-03 Kids' age to tune for.** Recommendation: ~6-10 for v0.1, adjustable.
- **BD-04 Keys/accounts available?** MVP needs a few: an LLM key (generation), a TTS key (if cloud voice), and Google Places (or an open POI source). Confirm what the owner already has.
- **BD-05 Live vs pre-generated.** Generate stories live as you drive (simpler to build, needs connectivity + latency handling, with caching) vs pre-generate for a known route. Recommendation: live with caching for v0.1.

## Definition of done for v0.1
On a real drive on a route the owner picks, the parent taps once and the app narrates, in warm Hebrew, accurate stories about what the kids can see, left/right/ahead, continuously and stably, start to finish, with no further interaction.
