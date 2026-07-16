# TripStory — Decision Log

_One entry per decision. ADR-lite. Status: Open / Closed._

---

## [DECISION OD-01] First market
**Status:** Open
**Question:** Where do we prove the engine first: Israel, US, or global?
**Recommendation:** Israel. Dense story-per-km, short drives (fast quality feedback), Hebrew+English forces multilingual early, testable in the owner's own car. Prove here, then the global exit story is credible.
**Trade-off:** Smaller immediate market; US is the eventual prize but is Autio's home turf.

## [DECISION OD-02] Primary rider age band
**Status:** Open
**Question:** 4-7, 8-12, or whole-family?
**Recommendation:** 8-12. Highest quality-per-effort: real stories, satisfying trivia, memory callbacks land. Grow down to 4-7 later; younger sibs ride along.
**Trade-off:** Not optimized for the youngest kids at launch.

## [DECISION OD-03] Strategic frame
**Status:** Open
**Question:** Standalone product, build-to-sell, or both sequenced?
**Recommendation:** Both, sequenced. Build the standalone product families love because that is what makes it acquirable. Exit is the outcome, not the roadmap.
**Trade-off:** Slower to court acquirers directly; but building "to sell" produces something no one wants to buy.

## [DECISION OD-04] Research before documenting the locked plan
**Status:** Open
**Question:** Run competitive + market research before locking the plan?
**Recommendation:** Yes. Research (Autio, GuideAlong, Detour post-mortem, kids-audio retention) then finalize, so the plan stands on facts not memory.

## [DECISION OD-05] Content sourcing strategy
**Status:** Open
**Question:** Which grounded datasets, and how curated vs generated?
**Notes:** Wikidata/Wikipedia geo, OSM, heritage registers, nature/park data, folklore/archaeology corpora. Firm rule: generation only states sourced facts.

## [DECISION OD-06] Voice / TTS approach
**Status:** Open
**Question:** How does the companion sound, and what TTS stack?
**Notes:** Warm friend, not a Wikipedia robot. Multilingual (Hebrew + English). Consistent character.

## [DECISION OD-07] Pricing / paywall placement
**Status:** Open
**Question:** Where does the paywall sit so 1-free-story converts?
**Notes:** The free story must be the magic one, on a route the family actually drives. Monthly vs per-story vs both.

## [DECISION OD-08] Repo access + git hook fix
**Status:** Partially resolved
**Question:** Add tripstoryapp to session scope and fix the macOS-pinned git-commit hook before first push.
**Update 2026-07-16:** Git-identity hook fixed to be environment-portable (reads/self-heals identity at the current repo instead of a hardcoded macOS path). tripstoryapp repo still not in session scope; work currently pushes to talsolomon/DubleSlash on the feature branch.

---

## [DECISION MVP] MVP v0.1 scope
**Status:** Closed (locked 2026-07-16)
**Decision:** Build the smallest thing that tests the core magic: one-tap, automatic, constant, stable, Hebrew, story-teller narration of what kids can see out the window, operated by the parent. Memory, trivia, accounts, payments, non-Hebrew, and Waze/Maps integration are deferred. See `planning/product/mvp-spec.md`.

## [DECISION LOC] Location source for MVP
**Status:** Closed (locked 2026-07-16)
**Decision:** Use the phone's native GPS (position, heading, speed) and compute "what's out the window" ourselves from POI coordinates + heading. Waze and Google Maps do NOT expose surroundings to third-party apps and are NOT an MVP dependency.

## [DECISION SEQ] Backend before frontend
**Status:** Closed (locked 2026-07-16)
**Decision:** Plan and build the backend first. The frontend is a thin client (stream GPS, play audio, report playback); all intelligence lives server-side.

---

# Backend decisions (open, see planning/tech/be-architecture.md)

## [DECISION BE-BD-01] Runtime / language
**Status:** Open. Node/TypeScript vs Python. Recommendation: Node/TS (fast async pipeline, one language if client is web later); Python fine if leaning on geo/ML libs.

## [DECISION BE-BD-02] Topology
**Status:** Open. Single always-on stateful service vs serverless + session store. Recommendation: one small always-on service (Cloud Run / Fly.io / Railway) for MVP.

## [DECISION BE-BD-03] Datastore
**Status:** Open. Recommendation: Postgres + PostGIS (geo queries now, family memory later).

## [DECISION BE-BD-04] POI + knowledge sources
**Status:** Open. Free (Wikipedia/Wikidata + OSM) vs paid (Google Places). Recommendation: start free, add Places only if coverage gaps appear.

## [DECISION BE-BD-05] LLM
**Status:** Open. Which model generates the Hebrew. Must be strong in Hebrew; pending a quick quality test.

## [DECISION BE-BD-06] TTS
**Status:** Open. Hebrew story-teller voice. Recommendation: ElevenLabs or Azure neural for expressiveness; Google as cheaper fallback.

## [DECISION BE-BD-07] Route prediction
**Status:** Open. Follow-current-road vs ask-for-destination. Recommendation: follow-road for MVP, destination as optional upgrade.
