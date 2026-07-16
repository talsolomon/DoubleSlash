# TripStory — Hebrew voice + story bake-off

The first time TripStory makes a sound. Goal: lock two decisions with your ears, not a spec sheet.
- **BE-BD-06 (voice):** which Hebrew TTS sounds like a story-teller to a kid.
- **BE-BD-05 (LLM):** which model writes the best Hebrew narration (optional, `--gen`).

Landmark: **Latrun**, Route 1 (Tel Aviv to Jerusalem). Age target ~6-10.

## Two ways to listen

### 1. Right now, free, device voice
Open **`listen.html`** on your phone or laptop. It speaks the three story tones (Playful / Warm / Mystery) using your device's built-in Hebrew voice, with the "look out the window" pauses timed in. Judge **tone, rhythm, and the pause**, not final voice quality (device TTS is robotic).
- If it says no Hebrew voice: iPhone → Settings → Accessibility → Spoken Content → Voices → add Hebrew. Desktop Chrome usually has "Google עברית".

### 2. Premium voices, needs keys
Run the harness to hear ElevenLabs / Azure / Google speak the same scripts:
```
cd tripstory/bakeoff
node tts-bakeoff.mjs           # every engine you have a key for
node tts-bakeoff.mjs --gen     # also regenerate the story with Claude + GPT
```
Set only the keys you want to test (missing ones are skipped, not errors):
- `ELEVENLABS_API_KEY` + `ELEVENLABS_VOICE_ID`
- `AZURE_TTS_KEY` + `AZURE_TTS_REGION` (try voices `he-IL-AvriNeural`, `he-IL-HilaNeural`)
- `GOOGLE_TTS_KEY` (voice `he-IL-Wavenet-A`)
- `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` (only for `--gen`)

Audio lands in `bakeoff/out/`. Listen, pick, and we log BE-BD-05 and BE-BD-06.

## Files
- `latrun-scripts.md` — the three Hebrew story variants (beats + English gloss + real facts + the generation prompt).
- `listen.html` — free device-voice player.
- `tts-bakeoff.mjs` — premium TTS + multi-LLM harness.

## Note
This is a throwaway test bench, not product code. The facts are authored for the test; in production, narration is grounded in sourced data (Wikipedia/Wikidata), never model memory.
