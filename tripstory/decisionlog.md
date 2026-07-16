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
**Status:** Open
**Question:** Add tripstoryapp to session scope and fix the macOS-pinned git-commit hook before first push.
