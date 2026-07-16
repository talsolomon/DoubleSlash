# TripStory — Backend Architecture (MVP v0.1)

_Locked-in-progress 2026-07-16. Backend planned before frontend, on purpose: the backend is the product, the frontend is a microphone and a speaker._

## The central idea: the backend runs AHEAD of the car
You cannot generate a story at the moment the car passes a landmark. POI lookup + grounding + LLM + TTS takes several seconds, and by then the landmark is gone. So the backend continuously works on the **road corridor ahead** of the car, pre-builds narrated audio segments, and drops each into a queue tagged with a **trigger point** (the location where it should play). When the car reaches that point, playback is instant because the audio already exists.

Everything below serves that one idea: stay ahead, pre-build, queue.

## The look-ahead pipeline (7 stages)
The car is a moving point. This pipeline keeps the queue full for the corridor in front of it.

1. **Position & route.** Ingest the device's GPS (position, heading, speed). Map-match to the road. Project the corridor ahead: the next few km along the current road, or the nav route if a destination is known.
2. **Discover.** Find POIs / features inside that corridor from grounded sources.
3. **Rank & schedule.** Score each candidate (salience, visibility, distance, worth-telling), assign a trigger point (where the car should hear it), and dedup against what has already been said this session.
4. **Ground.** Fetch verified facts + story seeds for the top upcoming candidates. Accuracy insurance: nothing is narrated that isn't sourced.
5. **Write.** LLM composes the Hebrew segment from the grounded material, sized to the time window before the car passes, with left / right / ahead computed from heading and bearing. Story-teller tone, age-tuned. Only sourced facts.
6. **Voice.** TTS renders Hebrew audio. Cache by text hash.
7. **Queue & serve.** The finished segment waits in the queue with its trigger point. The client plays it when the car arrives.

Stages 2-6 run ahead of the car for the corridor. Stage 7 (playback) is therefore always instant. That is the whole trick.

## Components / services
- **Session service** — holds per-drive state: current position, heading, speed, the trail, and segments delivered. This is also exactly where the future family-memory graph plugs in (session state -> persistent memory later).
- **Geo-context service** — "what's around and ahead": corridor projection + POI query + bearing/left-right-ahead + time-to-pass from speed.
- **Knowledge/grounding service** — verified facts per POI. Heavily cached.
- **Director (orchestration)** — the brain. Decides what to narrate next and when: pacing (leave gaps, never talk over itself), priority (a killer point beats a gas station), and dedup. Keeps the queue full without overfilling.
- **Generation service** — LLM -> grounded Hebrew story-teller segment.
- **TTS service** — Hebrew text -> audio, cached.
- **API layer** — thin. Client streams GPS up, gets queued segments + trigger points down, reports playback.

## Data model (MVP)
- **DriveSession**: id, startedAt, current {lat, lng, heading, speed, ts}, trail[], deliveredSegmentIds[].
- **Candidate**: id, name, coords, category, source, salienceScore.
- **KnowledgeItem**: candidateId, facts[], sources[], lang.
- **Segment**: id, candidateId, textHe, audioUrl, relation (left/right/ahead), triggerPoint {lat,lng}, distanceM, status (queued/playing/done), createdAt.
- **(deferred) FamilyMemory**: familyId, heardSegments[], learned[], preferences. Not built in MVP, but the schema is anticipated so it slots in.

## The device/backend boundary (matters for BE even though FE is later)
Device does the minimum: stream GPS up, play audio from the queue, report what finished playing. **All intelligence lives in the backend.** This keeps the client trivial and swappable (web now, native later) and keeps the valuable IP server-side.

## The hard problems (BE)
1. **Latency / look-ahead depth.** How far ahead to build depends on speed. Fast highway = build further ahead. The director must adapt corridor depth to speed so the queue is never empty and never stale.
2. **Route prediction without a destination.** If we don't know where they're going, we assume they follow the current road (road geometry ahead from OSM). A known destination makes this far better. MVP: follow-the-road; optional destination as an upgrade.
3. **Cost control.** POI lookups, LLM calls, and TTS all cost money per drive. Cache aggressively: POIs by geo-tile, knowledge by POI, audio by text hash. A popular road should get cheaper over time as caches warm.
4. **Pacing.** Silence is fine. The director should not cram narration; it should feel like a companion who speaks when there's something worth saying.

## Open backend decisions
- **BE-BD-01 Runtime/language.** Node/TypeScript vs Python. Recommendation: Node/TS for a fast async pipeline and one language if the client is web later; Python is fine if we lean on geo/ML libraries.
- **BE-BD-02 Topology.** One small always-on stateful service (holds session + queue in memory/Redis) vs serverless + external session store. Recommendation: single always-on service for MVP simplicity (Cloud Run / Fly.io / Railway).
- **BE-BD-03 Datastore.** Postgres + PostGIS for geo queries and later memory. Recommendation: yes.
- **BE-BD-04 POI + knowledge sources.** Free (Wikipedia/Wikidata geosearch + OpenStreetMap) vs paid (Google Places). Recommendation: start free (great for Israel's history/nature density), add Places only if coverage gaps show.
- **BE-BD-05 LLM.** Which model generates the Hebrew. Must be strong in Hebrew. Decision pending a quick Hebrew-quality test.
- **BE-BD-06 TTS.** Hebrew story-teller voice: Azure neural vs ElevenLabs vs Google Cloud TTS. Recommendation: ElevenLabs or Azure neural for expressiveness; Google as a cheaper fallback.
- **BE-BD-07 Route prediction.** Follow-current-road vs ask-for-destination. Recommendation: follow-road for MVP, destination as an optional upgrade.

## Definition of done (backend, v0.1)
Given a live GPS stream on a chosen route, the backend keeps a queue of accurate, grounded, Hebrew, story-teller audio segments with correct left/right/ahead and trigger points, staying ahead of the car for the whole drive, within cost and latency budgets, exposing a thin API a trivial client can consume.
