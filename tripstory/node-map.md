# TripStory — Node Map

## Project
- project: TripStory — location-aware audio road companion for families

## Concept
- pillar: the road live (where you are, left/right, ahead)
- pillar: stories (folklore + real notable people)
- pillar: nature (landscape, geology, flora, fauna)
- pillar: history and archaeology
- pillar: killer points (must-see highlights)
- pillar: trivia and recall (new + memory callbacks)

## Architecture
- layer: location (GPS/Waze/Maps, map-match, look-ahead)
- layer: knowledge (grounded verified datasets)
- layer: generation (LLM composes, never invents)
- layer: memory (per-family graph, the IP)
- layer: delivery (TTS voice, timing, ducking)
- layer: commerce (free story, paywall, subscription)

## Decisions
- decision: OD-01 first market (recommend Israel)
- decision: OD-02 rider age band (recommend 8-12)
- decision: OD-03 strategic frame (recommend both sequenced)
- decision: OD-04 research before locking plan
- decision: OD-05 content sourcing datasets
- decision: OD-06 voice and TTS
- decision: OD-07 pricing and paywall
- decision: OD-08 repo access and git hook fix

## Phases
- phase: 0 sharpen (now, no build)
- phase: 1 prove the content engine
- phase: 2 memory and trivia loop
- phase: 3 real-time location and live voice
- phase: 4 app shell and payments
