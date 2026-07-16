# TripStory — Narration & Interaction Design

_Locked 2026-07-16. This is the soul of the product: a communicational companion that plays with the kids, not a tour guide that reads facts._

## The feeling we're building
A warm friend in the passenger seat who constantly engages the kids: directs their eyes, makes them hunt for things, celebrates when they spot it, tells the story, and teases what's next. "Look left... can you find the old fortress?... found it? Amazing! A hundred years ago..."

## Core principle: constant PRESENCE, not constant sound
"Constantly talk to the kid" means a constant, warm presence with rhythm, NOT wall-to-wall narration. The best kids' companions breathe. The pause is the most important beat: it's when the kids actually look and shout out. A voice that never stops becomes noise a kid tunes out and a parent switches off. Silence between beats is a feature.

## The beat structure (every segment is built from these)
1. **Direct the eyes** — "תסתכלו שמאלה..." / "Look to the left..."
2. **Prompt the hunt** — "אתם רואים את המצודה הישנה? נסו למצוא אותה..." / "Can you find the old fortress?"
3. **Pause** — 2-4 seconds of silence so the kids look and call it out.
4. **Reveal + celebrate** — "מצאתם? מעולה!" / "Found it? Amazing!"
5. **The story** — what it is, and what stood here 100 years ago (temporal layer).
6. **Hook forward** — "עוד רגע יש הפתעה מצד ימין..." / "In a moment, a surprise on the right..."

Not every segment uses all six. The Director varies them so it never feels templated. Openings especially must vary.

## Interaction levels (build cheap magic first, make it real later)
- **L0 — MVP: talks, doesn't listen.** Rhetorical prompts + timed pauses + reveals. The kids answer each other and the parent; the app celebrates on cue. Feels two-way with zero speech recognition.
- **L1 — later: real listening.** Kid answers out loud, app confirms right/wrong. Needs Hebrew speech recognition, turn-taking, barge-in. Much bigger build.
- **L2 — later: scored trivia + memory callbacks.** Ties into the family-memory graph ("remember last time on this curve?").

MVP is strictly L0. We fake the interactivity beautifully and cheaply, then make it real.

## Temporal grounding ("what was here 100 years ago")
- Knowing what is here *now* is easy; knowing what *used to be here* needs historical data.
- Sources: Wikipedia history sections + Wikidata (inception dates, historical events, former names). Israel is dense with Ottoman, British Mandate, biblical, and old-Yishuv history, this layer is a genuine strength here.
- Rule holds: where we have sourced history, we use it; where we don't, we never invent it.

## Tone rules
- Warm, playful, curious. A friend, not a teacher.
- Age-tuned (kids). Short sentences. Concrete images. A little suspense and surprise.
- Hebrew, natural and spoken, not bookish.
- Celebrate participation. The goal is engagement, not information transfer.

## Backend implications (feeds be-architecture.md)
- **A "segment" is a sequence of beats, not one audio blob.** Each beat = {role, textHe, audioUrl?, pauseMs?}. Pauses are silence the client inserts between spoken beats.
- **Generation** produces the beat sequence (roles + text + pause durations), not a paragraph.
- **Director** sequences beats against trigger points, controls density/pacing (leaves silence, avoids over-talking), and varies structure so it doesn't feel templated.
- **TTS** renders each spoken beat; the pause beats carry no audio.
- **Data model** gains: Segment.beats[] = [{role, textHe, audioUrl, pauseMs}], where role in {attention, prompt, pause, reveal, story, hook}.
